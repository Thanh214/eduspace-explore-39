
import { API_URL, defaultHeaders, handleApiResponse, authHeader } from './config';

// Course types
export interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  image: string | null;
  lessons: number;
  students: number;
  rating?: number;
  features?: string[];
  duration?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseDetail extends Course {
  fullDescription: string;
  chapters: {
    id: number;
    title: string;
    order: number;
    lessons: {
      id: number;
      title: string;
      order: number;
    }[];
  }[];
}

// Get all courses
export const getAllCourses = async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = token ? authHeader(token) : defaultHeaders;

    const response = await fetch(`${API_URL}/courses`, {
      headers,
    });

    const data = await handleApiResponse(response);
    return data.data.courses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Get a single course
export const getCourse = async (id: string | number) => {
  try {
    const token = localStorage.getItem('token');
    const headers = token ? authHeader(token) : defaultHeaders;

    const response = await fetch(`${API_URL}/courses/${id}`, {
      headers,
    });

    const data = await handleApiResponse(response);
    return data.data.course;
  } catch (error) {
    console.error(`Error fetching course ${id}:`, error);
    throw error;
  }
};

// Get user enrolled courses
export const getEnrolledCourses = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/courses/user/enrolled`, {
      headers: authHeader(token),
    });

    const data = await handleApiResponse(response);
    return data.data.courses;
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    throw error;
  }
};

// Enroll in a course
export const enrollCourse = async (courseId: number) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/courses/${courseId}/enroll`, {
      method: 'POST',
      headers: authHeader(token),
    });

    const data = await handleApiResponse(response);
    return data;
  } catch (error) {
    console.error(`Error enrolling in course ${courseId}:`, error);
    throw error;
  }
};
