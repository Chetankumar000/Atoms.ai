// store/quizStore.js
import { create } from "zustand";

const useQuizStore = create((set) => ({
  questions: [],
  currentQuesIndex: 0,
  responses: [],
  loading: true,
  quizId: null,

  setQuizId: (quizId) => {
    set(() => ({
      quizId, // Corrected key to match the state
    }));
  },

  // Actions
  setQuestions: (questions) => {
    // Initialize responses based on questions
    const responses = questions.map((q) => ({
      questionId: q?.id,
      userAnswer: null, // Default to null
    }));

    set(() => ({ questions, responses, loading: false }));
  },
  setLoading: (loading) => set(() => ({ loading })),
  nextQuestion: () =>
    set((state) => {
      if (state.currentQuesIndex < state.questions.length - 1) {
        return { currentQuesIndex: state.currentQuesIndex + 1 };
      }
      return state;
    }),
  prevQuestion: () =>
    set((state) => {
      if (state.currentQuesIndex > 0) {
        return { currentQuesIndex: state.currentQuesIndex - 1 };
      }
      return state;
    }),

  addResponse: (questionId, userAnswer) => {
    set((state) => {
      const updatedResponses = state.responses.map((response) =>
        response.questionId === questionId
          ? { ...response, userAnswer }
          : response
      );
      return { responses: updatedResponses };
    });
  },
  resetResponses: () =>
    set((state) => ({
      responses: state.responses.map((response) => ({
        ...response,
        userAnswer: null, // Reset answers only
      })),
    })),
  resetcurrentQuesIndex: () =>
    set((state) => ({
      currentQuesIndex: 0,
    })),
  setcurrentQuesIndex: (x) =>
    set((state) => ({
      currentQuesIndex: x,
    })),
  getCorrectAnswerCount: () => {
    const { responses, questions } = get();

    if (!questions || !responses) return 0; // Handle cases where data might be missing

    return questions.reduce((correctCount, question) => {
      const response = responses[question.id];
      // Ensure response exists and is marked as correct
      return response?.isCorrect ? correctCount + 1 : correctCount;
    }, 0);
  },
}));

export default useQuizStore;
