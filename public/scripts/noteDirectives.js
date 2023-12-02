class NotePrimary extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('div');
    wrapper.innerHTML = '<slot></slot>';
    wrapper.setAttribute('class', 'note-primary');
    this.shadowRoot.append(wrapper);
  }
}
class NoteSecondary extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('div');
    wrapper.innerHTML = '<slot></slot>';
    wrapper.setAttribute('class', 'note-secondary');
    this.shadowRoot.append(wrapper);
  }
}
class NoteTertiary extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('div');
    wrapper.innerHTML = '<slot></slot>';
    wrapper.setAttribute('class', 'note-tertiary');
    this.shadowRoot.append(wrapper);
  }
}
class NoteNotice extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('div');
    wrapper.innerHTML = '<slot></slot>';
    wrapper.setAttribute('class', 'note-notice');
    this.shadowRoot.append(wrapper);
  }
}
class NoteWaning extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('div');
    wrapper.innerHTML = '<slot></slot>';
    wrapper.setAttribute('class', 'note-warning');
    this.shadowRoot.append(wrapper);
  }
}
class NoteError extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('div');
    wrapper.innerHTML = '<slot></slot>';
    wrapper.setAttribute('class', 'note-error');
    this.shadowRoot.append(wrapper);
  }
}
customElements.define('note-primary', NotePrimary);
customElements.define('note-secondary', NoteSecondary);
customElements.define('note-tertiary', NoteTertiary);
customElements.define('note-notice', NoteNotice);
customElements.define('note-warning', NoteWaning);
customElements.define('note-error', NoteError);
