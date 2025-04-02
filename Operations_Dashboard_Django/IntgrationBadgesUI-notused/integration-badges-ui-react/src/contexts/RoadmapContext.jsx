import React, {createContext, useContext, useReducer} from 'react';
import axios from 'axios';
import DefaultReducer from "./reducers/DefaultReducer";
import {useResources} from "./ResourcesContext";

const RoadmapContext = createContext({
    roadmapIds: [],
    roadmapMap: {},
    fetchRoadmaps: () => {
    },
    fetchRoadmap: ({roadmapId}) => {
    },
    getRoadmap: ({roadmapId}) => {
    },
    getRoadmaps: () => {
    }
});

export const useRoadmaps = () => useContext(RoadmapContext);

/**
 * Context provider for roadmaps
 * @param children
 */
export const RoadmapProvider = ({children}) => {
    const [roadmapIds, setRoadmapIds] = useReducer(DefaultReducer, []);
    const [roadmapMap, setRoadmapMap] = useReducer(DefaultReducer, {});

    const fetchRoadmaps = async () => {
        try {
            const response = await axios.get('/roadmaps');
            const _roadmaps = response.data.results;
            const _roadmapMap = {};
            const _roadmapIds = []
            for (let i = 0; i < _roadmaps.length; i++) {
                const _roadmap = _roadmaps[i];
                _roadmapIds.push(_roadmap.roadmap_id);
                _roadmapMap[_roadmap.roadmap_id] = {...roadmapMap[_roadmap.roadmap_id], ..._roadmap};
            }
            setRoadmapMap({
                ...roadmapMap,
                ..._roadmapMap
            });
            setRoadmapIds(_roadmapIds);


            return response.data.results;
        } catch (error) {
            return error;
        }
    };

    const fetchRoadmap = async ({roadmapId}) => {
        try {
            const response = await axios.get(`/roadmap/${roadmapId}`);
            const _roadmap = response.data.results;

            const _roadmapMap = {
                ...roadmapMap,
                [roadmapId]: {
                    ...roadmapMap[_roadmap.roadmap_id],
                    ..._roadmap
                }
            };
            setRoadmapMap(_roadmapMap);


            return response.data.results;
        } catch (error) {
            return error;
        }
    };


    const getRoadmap = ({roadmapId}) => {
        return roadmapMap[roadmapId];
    };

    const getRoadmaps = () => {
        return roadmapIds.map(roadmapId => getRoadmap({roadmapId}));
    };


    return (
        <RoadmapContext.Provider value={{roadmapMap, fetchRoadmaps, fetchRoadmap, getRoadmap, getRoadmaps}}>
            {children}
        </RoadmapContext.Provider>
    );
};
