import { defineStore } from 'pinia';
import api from '@/axios';

export const useQuizStore = defineStore('quiz', {
	actions: {
		async submitQuiz(quizData) {
			try {
				const response = await api.post('/api/qiuz', quizData);
				return response.data;
			} catch (error) {
				this.error = error.response
					? error.response.data.message
					: error.message;
			}
		},
	},
});
