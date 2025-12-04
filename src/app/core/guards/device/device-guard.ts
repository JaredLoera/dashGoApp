import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Device } from '../../services/device/device';
export const deviceGuard: CanActivateFn = (route, state) => {
  const deviceService = inject(Device);
  const router = inject(Router);
  const deviceType = deviceService.getDeviceType();
  if (deviceType !== 1 ) {
    console.warn('Access denied - Mobile devices only');
    router.navigate(['/not-allowed-device']);
  } 
  return true;
};
