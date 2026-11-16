const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');

const html = readFileSync(`${__dirname}/index.html`, 'utf8');

test('teléfono chileno: móvil, fijo, separadores y formatos inválidos', () => {
  const pattern = html.match(/id="telefono"[^>]*pattern="([^"]+)"/)[1];
  const phone = new RegExp(`^(?:${pattern})$`, 'v');
  for (const value of ['+56 9 1234 5678', '+56223456789', '912345678', '56-9-1234-5678']) {
    assert.ok(phone.test(value), value);
  }
  for (const value of ['', '+56', '12345678', '012345678', '+54 9 1234 5678', '9123456789', 'abc912345678']) {
    assert.ok(!phone.test(value), value);
  }
});

test('WhatsApp: texto completo, caracteres especiales, empresa opcional y validación', () => {
  const listeners = {};
  const submit = { disabled: true };
  let valid = true;
  const values = {
    nombre: "  Ana O'Ryan & Cía.  ",
    empresa: 'NIETEC + Asociados #1',
    email: 'ana+consulta@example.com',
    telefono: '+56 9 4985 6518',
    servicio: 'Gasfitería',
    mensaje: 'Revisar fuga al 100% & conexión #2.\n¿Plazo? 🛠️',
  };
  const form = {
    querySelector: () => submit,
    addEventListener: (event, callback) => { listeners[event] = callback; },
    reportValidity: () => valid,
    reset: () => assert.fail('No debe borrar los datos'),
  };
  const destinations = [];
  vm.runInNewContext(html.match(/<script>([\s\S]*?)<\/script>/)[1], {
    document: {
      addEventListener: (_, callback) => callback(),
      getElementById: id => id === 'contactForm' ? form : null,
      querySelectorAll: () => [],
    },
    FormData: function () { return new Map(Object.entries(values)); },
    window: { addEventListener() {}, location: { assign: url => destinations.push(url) } },
  });
  assert.equal(submit.disabled, false);
  const before = { ...values };
  listeners.submit({ preventDefault() {} });
  const url = new URL(destinations[0]);
  assert.equal(url.origin + url.pathname, 'https://wa.me/56949856518');
  assert.deepEqual([...url.searchParams.keys()], ['text']);
  assert.equal(url.searchParams.get('text'), [
    'Hola, equipo NIETEC. Me gustaría solicitar una cotización.', '',
    '*Servicio solicitado*', values.servicio, '',
    '*Detalle de la solicitud*', values.mensaje, '',
    '*Datos de contacto*',
    "Nombre: Ana O'Ryan & Cía.",
    'Empresa o lugar: NIETEC + Asociados #1',
    'Teléfono: +56 9 4985 6518',
    'Correo: ana+consulta@example.com', '',
    '¿Podrían indicarme su disponibilidad y un presupuesto estimado?',
  ].join('\n'));
  assert.deepEqual(values, before);
  values.empresa = '  ';
  listeners.submit({ preventDefault() {} });
  assert.ok(!new URL(destinations[1]).searchParams.get('text').includes('Empresa o lugar:'));
  valid = false;
  listeners.submit({ preventDefault() {} });
  assert.equal(destinations.length, 2);
});
