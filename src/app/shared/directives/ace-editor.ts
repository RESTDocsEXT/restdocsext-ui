import { Directive, EventEmitter, Output, ElementRef, Input, forwardRef } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import 'brace';
// import 'brace/theme/terminal';
import 'brace/theme/monokai';
import 'brace/mode/html';
import 'brace/mode/json';
import 'brace/mode/xml';

declare var ace: any;

export const aceEditorProvider: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AceEditorDirective),
  multi: true
};

@Directive({
  selector: '[aceEditor]',
  providers: [aceEditorProvider]
})
export class AceEditorDirective implements ControlValueAccessor {
  @Output('textChanged') textChanged = new EventEmitter();
  _options: any = {};
  _readOnly: boolean = false;
  _theme: string = 'monokai';
  _mode: string = 'json';
  _autoUpdateContent: boolean = true;
  editor: any;
  oldText: any;
  onChange: Function = Function.prototype;
  onTouched: Function = Function.prototype;

  constructor(elementRef: ElementRef) {
    let el = elementRef.nativeElement;
    this.editor = ace['edit'](el);
    this.editor.$blockScrolling = Infinity;

    this.init();
    this.initEvents();
  }

  init() {
    this.editor.setOptions(this._options || {});
    this.editor.setTheme(`ace/theme/${this._theme}`);
    this.editor.getSession().setMode(`ace/mode/${this._mode}`);
    this.editor.setReadOnly(this._readOnly);
  }

  initEvents() {
    this.editor.on('change', () => {
      let newVal = this.editor.getValue();
      if (newVal === this.oldText) {
         return;
      }
      if (typeof this.oldText !== 'undefined') {
        this.onChange(newVal);
      }
      this.textChanged.emit(newVal);
      this.oldText = newVal;
    });
  }

  @Input() set options(options: any) {
    this._options = options;
    this.editor.setOptions(options || {});
  }

  @Input() set readOnly(readOnly: any) {
    this._readOnly = readOnly;
    this.editor.setReadOnly(readOnly);
  }

  @Input() set theme(theme: any) {
    this._theme = theme;
    this.editor.setTheme(`ace/theme/${theme}`);
  }

  @Input() set mode(mode: any) {
    this._mode = mode;
    this.editor.getSession().setMode(`ace/mode/${mode}`);
  }

  @Input() set text(text: any) {
      if (text === null) {
          text = '';
      }

      if (this._autoUpdateContent === true) {
          this.editor.setValue(text);
          this.editor.clearSelection();
          this.editor.focus();
      }
  }

  @Input() set autoUpdateContent(status: any) {
      this._autoUpdateContent = status;
  }

  writeValue(value) {
    this.text = value;
  }

  registerOnChange(fn: (_: any) => any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: (_: any) => any) {
    this.onTouched = fn;
  }
}
