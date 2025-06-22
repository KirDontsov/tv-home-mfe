import { computed, SetupContext, useAttrs } from 'vue';

export function useInputAttributes() {
  const attrs = useAttrs();

  const eventAttrs = computed<SetupContext['attrs']>(() => {
    const entries = Object.entries(attrs).filter(([key]) => key.match(/^on/));
    return Object.fromEntries(entries);
  });

  const inputAttrs = computed<SetupContext['attrs']>(() => ({
    ...eventAttrs.value,
  }));

  return {
    inputAttrs,
  };
}
