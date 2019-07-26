import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var MovieService = /** @class */ (function () {
    function MovieService() {
        this.url = 'www.omdbapi.com';
        this.apiKey = '';
    }
    MovieService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], MovieService);
    return MovieService;
}());
export { MovieService };
//# sourceMappingURL=movie.service.js.map