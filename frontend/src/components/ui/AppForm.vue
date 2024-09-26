<template>
	<div class="form-container">
		<h2>{{ formTitle }}</h2>
		<form class="app-form" @submit.prevent="handleSubmit" :class="formClasses">
			<div v-for="(field, i) in fields" :key="i" class="form-group">
				<label :for="field.name">{{ field.label }}</label>

				<!-- Input Fields -->
				<input
					v-if="['text', 'password', 'email', 'tel'].includes(field.type)"
					v-model="formData[field.name]"
					:type="field.type"
					:id="field.name"
					:name="field.name"
					:placeholder="field.placeholder"
					@blur="validateField(field.name)"
					:class="{ 'is-invalid': errors[field.name] }"
					class="form-control"
				/>

				<!-- Number Input -->
				<input
					v-if="field.type === 'number'"
					v-model.number="formData[field.name]"
					:type="field.type"
					:id="field.name"
					:name="field.name"
					:placeholder="field.placeholder"
					:min="field.validation?.minLength"
					:max="field.validation?.maxLength"
					@blur="validateField(field.name)"
					:class="{ 'is-invalid': errors[field.name] }"
					class="form-control"
				/>

				<!-- Textarea -->
				<textarea
					v-if="field.type === 'textarea'"
					v-model="formData[field.name]"
					:id="field.name"
					:name="field.name"
					:placeholder="field.placeholder"
					@blur="validateField(field.name)"
					:class="{ 'is-invalid': errors[field.name] }"
					class="form-control"
				></textarea>

				<!-- Select Dropdown -->
				<select
					v-if="field.type === 'select'"
					v-model="formData[field.name]"
					:id="field.name"
					:name="field.name"
					@blur="validateField(field.name)"
					:class="{ 'is-invalid': errors[field.name] }"
					class="form-control"
				>
					<option
						v-for="(option, i) in field.options"
						:key="i"
						:value="option.value"
					>
						{{ option.text }}
					</option>
				</select>

				<!-- File Upload -->
				<input
					v-if="field.type === 'file'"
					type="file"
					multiple
					:id="field.name"
					:name="field.name"
					@change="handleFileUpload(field.name, $event)"
					:class="{ 'is-invalid': errors[field.name] }"
					class="form-control"
				/>

				<!-- Date input -->
				<input
					v-if="field.type === 'date'"
					v-model="formData[field.name]"
					:type="field.name"
					:id="field.name"
					:name="field.name"
					:class="{ 'is-invalid': errors[field.name] }"
					:min="new Date().toISOString().split('T')[0]"
					@change="(event) => updateFieldValue(field.name, event.target.value)"
					@blur="validateField(field.name)"
					class="form-control"
				/>

				<!-- Error Message -->
				<div v-if="errors[field.name]" class="invalid-field-error">
					{{ errors[field.name] }}
				</div>
			</div>

			<!-- Submit Button -->
			<AppButton is="button" :text="submitText" />
		</form>
	</div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue';
import AppButton from './AppButton.vue';

const props = defineProps({
	fields: {
		type: Array,
		required: true,
	},
	submitText: {
		type: String,
		default: 'Submit',
	},
	formTitle: {
		type: String,
		default: 'Form',
	},
	initialFieldsValues: { type: Object, default: () => ({}) },
	formClasses: String,
});

const formData = reactive({});
const errors = reactive({});
const emit = defineEmits(['submit', 'date-changed']);

watch(
	() => props.initialFieldsValues,
	(newValues) => {
		props.fields.forEach((field) => {
			formData[field.name] = newValues[field.name] || field.default || '';
			errors[field.name] = null;
		});
	},
	{ immediate: true },
);

// Dynamically set formData and errors for each field
props.fields.forEach((field) => {
	formData[field.name] = field.default || '';
	errors[field.name] = null;
});

const formClasses = computed(() => {
	return props.fields.length > 5 ? 'two-column-form' : '';
});

const handleSubmit = () => {
	let valid = true;
	props.fields.forEach((field) => {
		if (['text', 'email', 'textarea', 'tel', 'password'].includes(field.type)) {
			formData[field.name] = formData[field.name].trim();
		}

		if (!validateField(field.name)) {
			valid = false;
		}
	});

	if (valid) {
		const formDataObj = new FormData();
		Object.keys(formData).forEach((key) => {
			if (Array.isArray(formData[key])) {
				formData[key].forEach((file) => {
					formDataObj.append(key, file);
				});
			} else {
				formDataObj.append(key, formData[key]);
			}
		});

		emit('submit', formDataObj);
	}
};

const updateFieldValue = (name, value) => {
	const field = props.fields.find((f) => f.name === name);
	if (field) {
		field.value = value; // Update the field value directly
	}
};

// Validate form fields
const validateField = (fieldName) => {
	const field = props.fields.find((f) => f.name === fieldName);
	if (!field || !field.validation) return true;

	const value = formData[fieldName];
	errors[fieldName] = null;

	// General validation for required, minLength, maxLength, and pattern
	if (field.validation.required && !value) {
		errors[fieldName] = `${field.label} is required.`;
		return false;
	}

	if (field.validation.minLength && value.length < field.validation.minLength) {
		errors[
			fieldName
		] = `${field.label} must be at least ${field.validation.minLength} characters.`;
		return false;
	}

	if (field.validation.maxLength && value.length > field.validation.maxLength) {
		errors[
			fieldName
		] = `${field.label} must be less than ${field.validation.maxLength} characters.`;
		return false;
	}

	if (field.validation.pattern && !field.validation.pattern.test(value)) {
		errors[fieldName] = `Invalid ${field.label}.`;
		return false;
	}

	// File-specific validation
	if (field.type === 'file' && field.validation) {
		const files = value; // Array of files
		if (files.length > 0) {
			for (const file of files) {
				if (
					field.validation.allowedTypes &&
					!field.validation.allowedTypes.includes(file.type)
				) {
					errors[
						fieldName
					] = `Invalid file type. Allowed types: ${field.validation.allowedTypes.join(
						', ',
					)}`;
					return false;
				}

				if (field.validation.maxSize && file.size > field.validation.maxSize) {
					errors[
						fieldName
					] = `File size must be less than ${field.validation.maxSize} MB.`;
					return false;
				}
			}
		}
	}

	return true;
};

// Handle file uploads
const handleFileUpload = (fieldName, event) => {
	const files = Array.from(event.target.files);
	formData[fieldName] = files; // Store the array of files in formData
	validateField(fieldName);
};
</script>

<style scoped>
.form-container {
	background-color: var(--container-color);
	max-width: 65%;
	margin: auto;
	padding: 30px 50px;
	border-radius: 24px;
}

/* .two-column-form {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20px;
  } */

.form-container h2 {
	text-align: center;
}

.app-form {
	width: 50%;
	margin: auto;
}

.app-form button {
	display: block;
	margin: 20px auto;
}

label {
	color: var(--text-color-darl);
	font-size: 14px;
	font-weight: 500;
	line-height: 40px;
	margin-left: 17px;
}

.form-control {
	background-color: #e0ddd9;
	box-shadow: none;
	border: none;
	border-radius: 12px;
	padding: 20px 15px;
	font-family: var(--font-primary);
	display: block;
	width: 100%;
	border: 2px solid #e0ddd9;
}

.form-control.is-invalid {
	border: 2px solid #ca7070;
	transition: 0.3s;
}

.form-control:focus {
	border: 2px solid var(--accent-color);
	outline: none;
	transition: 0.3s;
}

.form-group {
	margin: auto;
}

.invalid-field-error {
	color: #d95959;
	font-size: 12px;
	font-weight: 400;
	margin-left: 17px;
	transition: 0.3s;
}
</style>
