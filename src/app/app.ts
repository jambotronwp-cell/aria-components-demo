import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { throwError, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  JT_ICONS, JtAlertComponent, JtBadgeComponent, JtDialogService, JtEmptyStateComponent, JtIconComponent,
  JtLoadingStateComponent, JtPasswordToggleComponent, JtSpinnerComponent, JtTabDirective, JtTabsComponent,
  JtThemeToggleComponent, JtToastService
} from '@jambotron/aria-components';

@Component({
  selector: 'app-root',
  imports: [JtAlertComponent, JtBadgeComponent, JtEmptyStateComponent, JtIconComponent,
    JtLoadingStateComponent, JtPasswordToggleComponent, JtSpinnerComponent, JtTabDirective, JtTabsComponent,
    JtThemeToggleComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly toasts = inject(JtToastService);
  private readonly dialogs = inject(JtDialogService);

  protected readonly statuses = ['running', 'healthy', 'deploying', 'queued', 'failed', 'unreachable', 'stopped', 'completed'];
  protected readonly tab = signal<string | undefined>('alerts');
  protected readonly result = signal('');
  protected readonly busy = signal(false);

  protected readonly iconFilter = signal('');
  protected readonly icons = computed(() => Object.keys(JT_ICONS).filter(name => name.includes(this.iconFilter().trim().toLowerCase())));


  protected simple(): void {
    this.dialogs.confirm({ title: 'Restart the server?', message: 'Running deployments continue after the restart.' })
      .subscribe(ok => this.result.set(`Restart: ${ok}`));
  }

  protected dangerous(): void {
    this.dialogs.confirm({
      title: 'Delete project', danger: true, confirmName: 'demo-shop', confirmLabel: 'Delete',
      message: 'The project, its containers and volumes are removed. This cannot be undone.',
      action: () => timer(1500)
    }).subscribe(ok => {
      this.result.set(`Delete: ${ok}`);
      if (ok) {
        this.toasts.success('Project demo-shop deleted');
      }
    });
  }

  protected failing(): void {
    this.dialogs.confirm({
      title: 'Rotate keys', message: 'The action fails on purpose: the error stays in the dialog, you can try again or cancel.',
      dontAsk: true, action: () => timer(1000).pipe(switchMap(() => throwError(() => new Error('Host incus-01 did not answer in 30 s'))))
    }).subscribe(ok => this.result.set(`Rotate: ${ok}`));
  }

  protected quick(): void {
    this.toasts.action(timer(1200), 'Cache cleared', this.busy).subscribe();
  }
}
