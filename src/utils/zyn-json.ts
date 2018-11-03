
export class ZynJSON {
	public static isCyclic (obj) {
		let seenObjects = [];

		function detect (obj) {
			if (obj && typeof obj === 'object') {
				if (seenObjects.indexOf(obj) !== -1) {
					return true;
				}
				seenObjects.push(obj);
				for (var key in obj) {
					if (obj.hasOwnProperty(key) && detect(obj[key])) {
						console.log(obj, 'cycle at ' + key);
						return true;
					}
				}
			}
			return false;
		}

		return detect(obj);
	}


	/**
	 * 	var o = {};
	 *  o.o = o;
	 *
	 * @param obj
	 * @param {boolean} checkCyclic
	 * @returns {string}
	 */
	public static stringify(obj: any, checkCyclic: boolean = false): string {
		let cache = [];
		return JSON.stringify(obj, (key, value) => {
			if (typeof value === 'object' && value !== null) {
				if (cache.indexOf(value) !== -1) {
					// Duplicate reference found
					try {
						// If this value does not reference a parent it can be deduped
						return JSON.parse(JSON.stringify(value));
					} catch (error) {
						// discard key if value cannot be deduped
						return;
					}
				}
				// Store value in our collection
				cache.push(value);
			}
			return value;
		});
	}

	public static safeStringify(obj: any): string {
		return ZynJSON.stringify(obj, true);
	}
}