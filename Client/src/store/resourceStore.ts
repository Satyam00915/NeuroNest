import { create } from "zustand";

interface Resource {
  type: string;
  url: string | undefined;
  title: string;
  tags: string[];
  thumbnailImg: string | undefined;
  file: File | undefined;
}

type State = {
  Resource: Resource;
};

type Action = {
  updateResource: (partial: Partial<Resource>) => void;
  reset: () => void;
};

const initialResource: Resource = {
  type: "",
  url: undefined,
  title: "",
  tags: [],
  thumbnailImg: undefined,
  file: undefined,
};

export const useResourceStore = create<State & Action>((set) => ({
  Resource: initialResource,

  updateResource: (partial) =>
    set((state) => {
      const updated = { ...state.Resource, ...partial };

      if (partial.tags) {
        const tagId = partial.tags[0];
        if (state.Resource.tags.includes(tagId)) {
          updated.tags = state.Resource.tags.filter((t) => t !== tagId);
        } else {
          updated.tags = [...state.Resource.tags, tagId];
        }
        return {
          Resource: updated,
        };
      }
      return {
        Resource: { ...state.Resource, ...partial },
      };
    }),

  reset: () => set({ Resource: initialResource }),
}));
