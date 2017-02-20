import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuard } from './authguard.service';
import { } from 'jasmine';

describe('AuthguardService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [AuthGuard]
		});
	});

	it('should ...', inject([AuthGuard], (service: AuthGuard) => {
		expect(service).toBeTruthy();
	}));
});
