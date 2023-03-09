// AppMock.test.tsx

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import {getAllCoursesFn} from './api/courseApi'

// Mock jest and set the type
jest.mock('axios');
const mockedAxios = axios;

describe('App', () => {
  const renderComponent = () => (render(<App />));

  test('renders learn react link', async () => {

    const { getByText, getAllByRole } = renderComponent();

    // Provide the data object to be returned
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'Joe Doe'
        },
        {
          id: 2,
          name: 'Jane Doe'
        }
      ],
    });

    fireEvent.click(getByText('Get users'));

    await waitFor(() => {
      const userList = getAllCourses();
      expect(userList).toHaveLength(2);
      expect(userList[0]).toHaveTextContent('Joe Doe');
      expect(userList[1]).toHaveTextContent('Jane Doe');
    });
  });
})