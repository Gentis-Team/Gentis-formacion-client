import { getAllLocationsFn } from '@/api/locationApi';
import { useQuery } from '@tanstack/react-query';
import useHandleError from './useHandleError';
import { useLocationsContext } from '@/services/providers/LocationsContextProvider';
import { useCategoriesContext } from '@/services/providers/CategoriesContextProvider';
import { useRequirementsContext } from '@/services/providers/RequirementsContextProvider';
import { useGroupsContext } from '@/services/providers/GroupsContextProviders';
import { getAllRequirementsFn } from '@/api/requirementApi';
import { getAllGroupsFn } from '@/api/groupApi';
import { getAllCategoriesFn } from '@/api/categoryApi';

export function useQueryLocations(error) {
    const locationsContext = useLocationsContext();

    const {data: locations } = useQuery(['locations'], () => getAllLocationsFn(), {
        select: (data) => data.locations,
        onSuccess: (data) => {
          locationsContext.dispatch({ type: 'SET_LOCATIONS', payload: data });
        },
        onError: (error) => useHandleError(error),
      });
}

export function useQueryRequirements(error) {
  const requirementsContext = useRequirementsContext();

  const {data: requirements } = useQuery(['requirements'], () => getAllRequirementsFn(), {
      select: (data) => data.requirements,
      onSuccess: (data) => {
        requirementsContext.dispatch({ type: 'SET_REQUIREMENTS', payload: data });
      },
      onError: (error) => useHandleError(error),
    });
}

export function useQueryGroups(error) {
  const groupsContext = useGroupsContext();

  const {data: groups } = useQuery(['groups'], () => getAllGroupsFn(), {
      select: (data) => data.groups,
      onSuccess: (data) => {
        groupsContext.dispatch({ type: 'SET_GROUPS', payload: data });
      },
      onError: (error) => useHandleError(error),
    });
}

export function useQueryCategories(error) {
  const categoriesContext = useCategoriesContext();

  const {data: categories } = useQuery(['categories'], () => getAllCategoriesFn(), {
      select: (data) => data.categories,
      onSuccess: (data) => {
        categoriesContext.dispatch({ type: 'SET_CATEGORIES', payload: data });
      },
      onError: (error) => useHandleError(error),
    });
}