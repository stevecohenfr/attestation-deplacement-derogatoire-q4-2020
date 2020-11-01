import shortcutData from '../shortcut-data.json'
import { $, appendTo, createElement } from './dom-utils'

export function addShortcuts() {
  const shortcuts = $('#shortcuts')
  // Évite de recréer le formulaire s'il est déjà créé par react-snap (ou un autre outil de prerender)
  if (shortcuts.innerHTML !== '') {
    return
  }
  const appendToShortcuts = appendTo(shortcuts)

  const formShortcutPart = shortcutData
    .map((field, index) => {
      const buttonAttrs = {
        className: 'btn btn-secondary shortcut',
        type: 'button',
        innerHTML: '<span ><i class="fas fa-' + field.icon + '"></i> ' + field.firstname + " " + field.lastname + '</span>',
      }
      var elem = createElement("button", buttonAttrs);
      elem.setAttribute("data-name", (field.firstname + field.lastname).toLowerCase())
      elem.addEventListener('click', async (event) => {
        event.preventDefault()
        const keys = Object.keys(field);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const value = field[key];
          const input = $('input[name=' + key + ']');
          if (null !== input) {
            input.setAttribute("value", value);
          }
        }
        document.getElementById("reason-fieldset").scrollIntoView({ behavior: 'smooth', block: 'center' });
        document.getElementById("reason-fieldset").className = "fieldset fieldset-error";
      });
      return elem
    })

    appendToShortcuts(formShortcutPart);
}
