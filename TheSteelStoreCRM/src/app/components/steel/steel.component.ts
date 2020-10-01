import {
	Component,
	OnInit,
	AfterViewInit,
	ViewChild,
	ViewContainerRef,
	ComponentFactoryResolver,
	Injector,
	ViewEncapsulation
} from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { map, tap } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { MaterialsFormService } from 'src/app/shared/services/materials-form.service';
import { FormGroup } from '@angular/forms';
import { SteelDataModel } from 'src/app/core/models/steel-data.model';
import { SteelDataService } from 'src/app/core/services/steel-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { LoaderService } from 'src/app/core/services/loader.service';
@Component({
	selector: 'app-steel',
	templateUrl: 'steel.component.html',
	styleUrls: [ 'steel.component.css' ],
	encapsulation: ViewEncapsulation.None
})
export class SteelComponent implements OnInit {
	baseUrl = 'https://porduct-details.s3.amazonaws.com/';
	@ViewChild('vcContainer', { read: ViewContainerRef })
	vcContainer: ViewContainerRef;
	materialsData: any | SteelDataModel;
	columns: any[];
	@ViewChild('file') file;
	public files: Set<File> = new Set();
	steel: any[];
	pageSize: number;
	displayBasic: boolean;
	storeData: any;
	csvData: any;
	jsonData: any;
	textData: any;
	htmlData: any;
	fileUploaded: File;
	worksheet1: any;
	worksheet2: any;
	details: any;
	selectedItemDetails: any;
	allMaterialDetails: any;
	formSample: FormGroup;
	workbook: any;
	loading = true;
	first = 0;
	coilNumber: any;
	filters: any;
	totalRecords = 0;
	constructor(
		private routeStateService: RouteStateService,
		private steelService: SteelDataService,
		private userService: UserDataService,
		private cfr: ComponentFactoryResolver,
		private injector: Injector,
		private materialFormService: MaterialsFormService,
		private toastService: ToastService,
		private utilityService: UtilityService,
		private loaderService: LoaderService
	) {}
	ngOnInit() {
		this.pageSize = 10;
		this.columns = [
			{ field: 'COILNUMBER', header: 'Product ID' },
			{ field: 'PRODUCT', header: 'Product' },
			{ field: 'QUALITY', header: 'Quality' },
			{ field: 'THICKNESS_IN', header: 'Thickness(in)' },
			{ field: 'WIDTH_IN', header: 'Width(in)' },
			{ field: 'WEIGHT_LB', header: 'Weight(lbs)' },
			{ field: 'PIW', header: 'PIW' },
			{ field: 'LOCATION', header: 'Location' },
			{ field: '', header: 'Action' }
		];
		this.loadSteelDataOnGrid();
	}

	loadSteelDataOnGrid() {
		this.filters = {
			coilNumber: this.coilNumber || '',
			pageSize: 10,
			status: 2,
			searchText: '',
			fromDate: null,
			toDate: null
		};
		this.loading = true;
		this.steelService.productData(this.filters).subscribe(
			(data) => {
				if (data && data['data'].length > 0) {
					this.loading = false;
					this.createMappingForGrid(data);
				}
			},
			(error) => {
				this.loading = false;
			}
		);
	}

	createMappingForGrid(data: any) {
		this.steel = [];
		this.allMaterialDetails = data['data'];
		this.totalRecords = this.allMaterialDetails[0].TotalCount || 0;
		this.allMaterialDetails.map((item: any, index: number) => {
			if (!item.INACTIVE) {
				this.steel.push({
					COILNUMBER: `TS${item.COILNUMBER}`,
					PRODUCT: item.PRODUCT,
					QUALITY: item.QUALITY,
					THICKNESS_IN: item.THICKNESS_IN,
					WIDTH_IN: item.WIDTH_IN,
					WEIGHT_LB: item.WEIGHT_LB,
					PIW: item.PIW,
					LOCATION: item.LOCATION
				});
			}
		});
	}

	async showBasicDialog(colDetails: any) {
		this.displayBasic = true;
		// colDetails.COILNUMBER.match(/[0-9]+/g)
		this.selectedItemDetails = this.allMaterialDetails.find((x: any) => x.PIW === colDetails.PIW);
		await this.loadChildComponent();
	}

	private async loadChildComponent() {
		this.vcContainer.clear();
		const { SteelListComponent } = await import('./steel-list/steel-list.component');
		const containerFactory = this.cfr.resolveComponentFactory(SteelListComponent);
		const { instance } = this.vcContainer.createComponent(containerFactory, null, this.injector);
		instance.materialDetails = this.selectedItemDetails;
	}

	addFiles() {
		this.file.nativeElement.click();
	}

	uploadFile(event: any) {
		this.fileUploaded = event.target.files[0];
		this.readExcel();
	}

	readExcel() {
		const readFile = new FileReader();
		readFile.onload = (e) => {
			this.storeData = readFile.result;
			const data = new Uint8Array(this.storeData);
			const arr = new Array();
			for (let i = 0; i < data.length; ++i) {
				arr[i] = String.fromCharCode(data[i]);
			}
			const bstr = arr.join('');
			this.workbook = XLSX.read(bstr, { type: 'binary' });
		};
		readFile.readAsArrayBuffer(this.fileUploaded);
	}

	onFilesAdded() {
		this.jsonData = [];
		for (let i = 0; i < this.workbook.SheetNames.length; i++) {
			const sheetName = this.workbook.SheetNames[i];
			const item = XLSX.utils.sheet_to_json(this.workbook.Sheets[sheetName], { raw: false });
			if (item && item.length > 0) {
				this.jsonData.push(...item);
			}
		}
		this.jsonData = JSON.stringify(this.jsonData);
		const data: Blob = new Blob([ this.jsonData ], { type: 'application/json' });
		// FileSaver.saveAs(data, 'JsonFile' + new Date().getTime() + '.json');
		this.loaderService.show();
		const res = this.steelService.loadAllProducts(JSON.parse(this.jsonData));
		res.subscribe(
			(data1) => {
				this.loaderService.hide();
				// this.createMappingForGrid(data1['data']);
				this.loadSteelDataOnGrid();
				this.toastService.addSingle(data1['data']['status'].toString(), '', data1['data']['message']);
			},
			(error) => {
				this.loaderService.hide();
			},
			() => {
				// this.loading = false;
			}
		);
	}

	loadPageData(event: any): void {
		this.first = event.first;
		this.pageSize = event.rows;
		const currentPageNumber = this.getCurrentPage(this.first, this.pageSize);
		console.log(this.steel);
		this.coilNumber = currentPageNumber === 1 ? null : this.steel[this.pageSize - 1].PIW;
	}

	onPage(event: any) {
		this.first = event.first;
		this.pageSize = event.rows;
		const currentPageNumber = this.getCurrentPage(this.first, this.pageSize);
		this.coilNumber = currentPageNumber === 1 ? null : this.steel[this.pageSize - 1].PIW;
		this.loadSteelDataOnGrid();
		return;
	}

	getCurrentPage(currentRecords: number, recordsPerPage: number): number {
		return currentRecords === 0 ? 1 : Math.ceil(currentRecords / recordsPerPage) + 1;
	}

	onMaterialFormSave() {
		this.loaderService.show();
		this.displayBasic = false;
		const imageDetails$ = this.steelService.retrieveImageDetails();
		const productDetails$ = this.materialFormService.materialSpecDetails;
		this.steelService.updateProductAndImage(imageDetails$, productDetails$);
		this.loadSteelDataOnGrid();
	}

	onMaterialFormClose() {
		this.displayBasic = false;
	}

	syncToAlgolia() {
		this.loaderService.show();
		this.steelService.syncDataToAlgolia().subscribe(
			(result) => {
				if (result) {
					this.loaderService.hide();
					this.toastService.addSingle(result['status'], '', result['message']);
				}
			},
			(error) => {
				this.loaderService.hide();
			}
		);
	}
}
