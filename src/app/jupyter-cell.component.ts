import { AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CodeCell, CodeCellModel } from '@jupyterlab/cells';
import { CodeEditor } from '@jupyterlab/codeeditor';
import { RenderMimeRegistry, standardRendererFactories } from '@jupyterlab/rendermime';
import { Widget } from '@lumino/widgets';

@Component({
  selector: 'jupyter-cell',
             template: '<div #jupyterCell [class.editorReadonly]="!editable"></div>',
             providers: [
               {
                 provide: NG_VALUE_ACCESSOR,
                 useExisting: forwardRef(() => JupyterCellComponent),
                 multi: true,
               },
             ],
           })
export class JupyterCellComponent implements AfterViewInit, ControlValueAccessor {
  @Input() options: any;
  @Input() editable = true;

  @ViewChild('jupyterCell', { static: true }) cellContainer: ElementRef | undefined;

  private cell: CodeCell | undefined;
  private editor: CodeEditor.IEditor | undefined;
  private suppressUpdateEvent = false;
  private value = '';
  private readonly editorConfig: any = {
    mode: 'python',
    version: 3,
    lineNumbers: true,
    lineWrapping: false,
  };
  private onChange = (_: string) => {};

  ngAfterViewInit() {
    if (!!this.cellContainer) {
      const rendermime = new RenderMimeRegistry({ initialFactories: standardRendererFactories });
      this.cell = new CodeCell({
                                 rendermime,
                                 model: new CodeCellModel({}),
                                 editorConfig: this.editorConfig,
                               });

      this.cell.model.value.text = this.value;
      this.cell.model.value.changed.connect(this._modelChanged, this);
      this.cell.model.mimeType = 'text/x-ipython';

      Widget.attach(this.cell, this.cellContainer.nativeElement);
      this.cell.activate();
      this.cell.readOnly = !this.editable;

      this.editor = this.cell.editor;
    }
  }

  resize(width: number, height: number): void {
    this.editor?.setSize({ width, height });
    this.editor?.refresh();
  }

  private _modelChanged() {
    if (!this.suppressUpdateEvent) {
      this.value = this.cell ? this.cell.model.value.text : '';
      this.onChange(this.value);
    }
    this.suppressUpdateEvent = false;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  writeValue(value: string): void {
    if (value === null || value === undefined) {
      return;
    }
    if (!this.cell) {
      this.value = value;
    } else {
      const cur = this.cell.model.value.text;
      if (value !== cur) {
        this.value = value;

        // Wait for CodeMirror to be visible before setting the content to avoid styling issues.
        const element = this.cellContainer?.nativeElement;
        new IntersectionObserver((entries, observer) => {
          this.suppressUpdateEvent = true;
          if(this.cell) this.cell.model.value.text = this.value;
          observer.unobserve(element);
          this.editor?.refresh();
        }).observe(element);
      }
    }
  }

  registerOnTouched(fn: () => void): void {}

  setDisabledState(isDisabled: boolean): void {}
}
