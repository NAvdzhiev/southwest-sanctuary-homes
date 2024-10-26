<template>
	<section class="quiz">
		<router-view
			:selected-images="selectedImages"
			:spaces-to-renovate="spaces"
			:fields="formFields"
			:initial-fields-values="formData"
			:on-submit="submitQuiz"
			@update:selected-images="updateSelectedImages"
		></router-view>
	</section>
	<nav class="quiz__navigation">
		<AppButton v-if="currentStep > 1" text="Back" @click="prevStep" />
		<AppButton v-if="currentStep < 3" text="Next" @click="nextStep" />
	</nav>
</template>

<script setup>
import { ref } from 'vue';
import { useQuizStore } from '@/store/quizStore';
import { useRouter } from 'vue-router';
import AppButton from '@/components/ui/AppButton.vue';

const quizStore = useQuizStore();
const router = useRouter();
const currentStep = ref(1);
const selectedImages = ref([]);
const spaces = ref([]);

const formFields = ref([
	{
		name: 'firstName',
		type: 'text',
		label: 'First Name',
		placeholder: 'Enter your first name',
		validation: {
			required: true,
			pattern: /^[a-z ,.'-]+$/i,
		},
	},
	{
		name: 'lastName',
		type: 'text',
		label: 'Last Name',
		placeholder: 'Enter your last name',
		validation: {
			required: true,
			pattern: /^[a-z ,.'-]+$/i,
		},
	},
	{
		name: 'phone',
		type: 'tel',
		label: 'Phone Number',
		placeholder: 'Enter your phone number',
		validation: {
			required: true,
			pattern: /([0-9\s-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/,
		},
	},
	{
		name: 'email',
		type: 'email',
		label: 'Email',
		placeholder: 'Enter your email',
		validation: {
			required: true,
			pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		},
	},
	{
		name: 'state',
		type: 'text',
		label: 'State',
		placeholder: 'Enter your state',
		options: [
			{ value: 'NV', text: 'Nevada' },
			{ value: 'CA', text: 'California' },
			{ value: 'AZ', text: 'Arizona' },
			{ value: 'NM', text: 'New Mexico' },
		],
		validation: {
			required: true,
		},
	},
	{
		name: 'zipCode',
		type: 'text',
		label: 'Zip Code',
		placeholder: 'Enter your zip code',
		validation: {
			required: true,
			pattern:
				/^(89[0-8][0-9]{2}|9[0-5][0-9]{3}|850[0-9]{2}|85[1-5][0-9]{2}|865[0-5][0-9]|870[0-9]{2}|87[1-9][0-9]{2}|880[0-9]{2}|88[1-3][0-9]{2})$/,
		},
	},
]);

const formData = ref({
	firstName: '',
	lastName: '',
	phone: '',
	email: '',
	state: '',
	zipCode: '',
});

const nextStep = () => {
	currentStep.value++;
	router.push(`/quiz/step-${currentStep.value}`);
};

const prevStep = () => {
	if (currentStep.value > 1) {
		currentStep.value--;
		if (currentStep.value === 1) {
			router.push('/quiz');
		} else {
			router.push(`/quiz/step-${currentStep.value}`);
		}
	}
};

const updateSelectedImages = (newSelectedImages) => {
	selectedImages.value = newSelectedImages;
};

const submitQuiz = async () => {
	const quizData = {
		selectedImages: selectedImages.value,
		spaces: spaces.value,
		...formFields.value,
	};

	try {
		quizStore.submitQuiz(quizData);
		router.replace('/design-and-renovation');
	} catch (error) {
		console.warn(error);
	}
};
</script>

<style scoped>
.quiz__navigation {
	display: flex;
	justify-content: space-between;
	padding: 5px 10px;
	background: #fff;
	position: relative;
}
</style>
