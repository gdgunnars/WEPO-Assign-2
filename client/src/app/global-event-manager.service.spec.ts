import { TestBed, async, inject } from '@angular/core/testing';
import { GlobalEventManagerService } from './global-event-manager.service';
import {} from '@jasmine';

describe('GlobalEventManagerService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [GlobalEventManagerService]
		});
	});

	it('should ...', inject([GlobalEventManagerService], (service: GlobalEventManagerService) => {
		expect(service).toBeTruthy();
	}));
});
