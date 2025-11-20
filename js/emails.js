// site/js/emails.js - versión robusta
// Decodifica Base64, construye por concatenación y decodifica ROT13.
// Espera a DOMContentLoaded y evita errores si faltan elementos.

(function(){
  'use strict';

  function rot13(s){
    return s.replace(/[A-Za-z]/g, function(c){
      var code = c.charCodeAt(0);
      var base = (code >= 97) ? 97 : 65;
      return String.fromCharCode(((code - base + 13) % 26) + base);
    });
  }

  function safeSetText(id, value){
    var el = document.getElementById(id);
    if (!el) {
      console.warn('emails.js: elemento no encontrado:', id);
      return false;
    }
    try {
      el.textContent = value;
      return true;
    } catch(e){
      console.error('emails.js: error escribiendo en', id, e);
      return false;
    }
  }

  function runAll(){
    // 0) Primary base64 into #js-email (if used in index)
    try {
      var jsEmailEl = document.getElementById('js-email');
      if (jsEmailEl) {
        var b64primary = 'c2VjdXJpdHlAZXJlYnVzLmVz';
        try {
          jsEmailEl.textContent = (typeof atob === 'function') ? atob(b64primary) : '(no-atob)';
        } catch(e) {
          jsEmailEl.textContent = '(invalid base64)';
        }
      }
    } catch(e){ console.error('emails.js primary base64 error', e); }

    // 1) Base64 decode -> out-b64
    try {
      var b64el = document.getElementById('b64');
      if (b64el) {
        var b64 = b64el.textContent.trim();
        var decoded = '(no-atob)';
        if (typeof atob === 'function') {
          try { decoded = atob(b64); } catch(e) { decoded = '(invalid base64)'; }
        }
        safeSetText('out-b64', decoded);
      } else {
        console.warn('emails.js: #b64 no existe');
      }
    } catch(e){ console.error('emails.js base64 error', e); }

    // 2) Concatenation -> out-concat
    try {
      var emailConcat = 'sec' + 'urity' + '@' + 'erebus.es';
      safeSetText('out-concat', emailConcat);
    } catch(e){ console.error('emails.js concat error', e); }

    // 3) ROT13 -> out-rot13
    try {
      var rotEl = document.getElementById('rot13');
      if (rotEl) {
        var rotText = rotEl.textContent.trim();
        safeSetText('out-rot13', rot13(rotText));
      } else {
        console.warn('emails.js: #rot13 no existe');
      }
    } catch(e){ console.error('emails.js rot13 error', e); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAll, {once:true});
  } else {
    runAll();
  }
})();
