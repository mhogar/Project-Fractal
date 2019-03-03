function createPopup(id, content) {
	$('#' + id).popup({
		content: content,
		on: 'manual'
	});
}

export const createPopupHelper = {
	methods: {createPopup: createPopup}
};

export const requiredValidator = {
	methods: {
		validateRequired: function(popupId, field) {
			if (field === '') {
				createPopup(popupId, 'This field is required.');
				$('#' + popupId).popup('show');
				return false;
			}

			return true;
		}
	}
};

export const stringValidator = {
	methods: {
		validateString: function(popupId, field, minLength, maxLength) {
			if (field.length < minLength) {
				createPopup(popupId, 'Min length: ' + minLength);
				$('#' + popupId).popup('show');
				return false;
			}

			if (field.length > maxLength) {
				createPopup(popupId, 'Max length: ' + maxLength);
				$('#' + popupId).popup('show');
				return false;
			}

			return true;
		}
	}
};

export const intValidator = {
	methods: {
		validateInt: function(popupId, field, minValue, maxValue) {
			if (isNaN(field)) {
				createPopup(popupId, 'This field must be a number.');
				$('#' + popupId).popup('show');
				return false;
			}

			if (field < minValue) {
				createPopup(popupId, 'Min value: ' + minValue);
				$('#' + popupId).popup('show');
				return false;
			}

			if (field > maxValue) {
				createPopup(popupId, 'Max value: ' + maxValue);
				$('#' + popupId).popup('show');
				return false;
			}

			return true;
		}
	}
};