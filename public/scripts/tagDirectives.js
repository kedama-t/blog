class TagPrimary extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('span');
    wrapper.innerHTML = '<slot></slot>';
    wrapper.setAttribute('class', 'tag-primary');
    this.shadowRoot.append(wrapper);
  }
}
class TagSecondary extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('span');
    wrapper.innerHTML = '<slot></slot>';
    wrapper.setAttribute('class', 'tag-secondary');
    this.shadowRoot.append(wrapper);
  }
}
class TagTertiary extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('span');
    wrapper.innerHTML = '<slot></slot>';
    wrapper.setAttribute('class', 'tag-tertiary');
    this.shadowRoot.append(wrapper);
  }
}
class TagNotice extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('span');
    wrapper.innerHTML = '<slot></slot>';
    wrapper.setAttribute('class', 'tag-notice');
    this.shadowRoot.append(wrapper);
  }
}
class TagWaning extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('span');
    wrapper.innerHTML = '<slot></slot>';
    wrapper.setAttribute('class', 'tag-warning');
    this.shadowRoot.append(wrapper);
  }
}
class TagError extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('span');
    wrapper.innerHTML = '<slot></slot>';
    wrapper.setAttribute('class', 'tag-error');
    this.shadowRoot.append(wrapper);
  }
}
customElements.define('tag-primary', TagPrimary);
customElements.define('tag-secondary', TagSecondary);
customElements.define('tag-tertiary', TagTertiary);
customElements.define('tag-notice', TagNotice);
customElements.define('tag-warning', TagWaning);
customElements.define('tag-error', TagError);
