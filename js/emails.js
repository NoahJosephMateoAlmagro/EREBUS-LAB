// emails.js - decodifica 3 patrones distintos y escribe en los elementos del DOM.
// 1) Base64 en el contenido del elemento #b64
// 2) Concatenación (simula partes separadas en variables)
// 3) ROT13

(function(){
  // Helper rot13
  function rot13(s){
    return s.replace(/[A-Za-z]/g, function(c){
      var code = c.charCodeAt(0);
      var base = (code >= 97) ? 97 : 65;
      return String.fromCharCode(((code - base + 13) % 26) + base);
    });
  }

  // 1) Base64 decode
  try {
    var b64el = document.getElementById('b64');
    var outB64 = document.getElementById('out-b64');
    if (b64el && outB64) {
      var b64 = b64el.textContent.trim();
      var decoded = (typeof atob === 'function') ? atob(b64) : '(no-atob)';
      outB64.textContent = decoded;
    }
  } catch(e) {
    console.error('base64 decode error', e);
  }

  // 2) Concatenation example (simulate external script pieces)
  try {
    var outConcat = document.getElementById('out-concat');
    if (outConcat) {
      // Simula piezas que vienen de distintos scripts/variables
      var partA = 'sec';
      var partB = 'urity';
      var partC = '@';
      var partD = 'erebus.es';
      var emailConcat = partA + partB + partC + partD;
      outConcat.textContent = emailConcat;
    }
  } catch(e) {
    console.error('concat build error', e);
  }

  // 3) ROT13 decode
  try {
    var rotEl = document.getElementById('rot13');
    var outRot = document.getElementById('out-rot13');
    if (rotEl && outRot) {
      var rotText = rotEl.textContent.trim();
      var decodedRot = rot13(rotText);
      outRot.textContent = decodedRot;
    }
  } catch(e) {
    console.error('rot13 error', e);
  }
})();
