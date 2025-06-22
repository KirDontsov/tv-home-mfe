<template>
  <div
    class="ui-input"
    :class="classes"
  >
    <label
      v-if="label"
      class="ui-input-label"
    >{{ label }}</label
    >

    <template v-if="!isTextarea">
      <div class="ui-input-block">
        <input
          ref="element"
          v-model="model"
          v-bind="inputAttrs"
          class="ui-input-input"
          :class="inputClasses"
          :type="type"
          :placeholder="placeholder"
          :maxlength="maxlength"
          :disabled="disabled"
          :min="min"
          :max="max"
          @input="input"
          @keydown="checkChar($event)"
        />
      </div>
    </template>

    <template v-else>
      <textarea
        ref="element"
        v-model="model"
        v-bind="inputAttrs"
        class="ui-input-textarea"
        :class="{ 'ui-input--error': errorMessage }"
        type="text"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :disabled="disabled"
        @input="input"
      />
    </template>

    <p
      v-if="errorMessage"
      class="ui-input-error-message"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRef } from 'vue';
import { syncRef, useFocus } from '@vueuse/core';
import { useInputAttributes } from '@/composables/InputAttributes';
import { getNumberInRange } from '@/helpers/numbers';

type UiInputProps = {
  outline?: boolean;
  disabled?: boolean;
  spinner?: boolean;
  iconBefore?: string;
  label?: string;
  modelValue?: string | number;
  placeholder?: string;
  invalid?: boolean;
  errorMessage?: string;
  type?: 'text' | 'textarea' | 'number';
  maxlength?: string | number;
  min?: number;
  max?: number;
  skipPattern?: string;
  withArrowControls?: boolean;
};

const props = withDefaults(defineProps<UiInputProps>(), {
  iconBefore: '',
  label: '',
  modelValue: '',
  placeholder: '',
  errorMessage: '',
  type: 'text',
  maxlength: undefined,
  min: undefined,
  max: undefined,
  skipPattern: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const { inputAttrs } = useInputAttributes();

const element = ref<HTMLElement>();
const { focused } = useFocus(element);

const isTextarea = computed(() => props.type === 'textarea');

const classes = computed(() => ({
  'ui-input--outline': props.outline,
  'ui-input--icon-before': props.iconBefore,
  'ui-input--focused': focused.value,
}));

const inputClasses = computed(() => ({
  'ui-input-input--spinner': props.spinner,
  'ui-input--error': props.invalid || props.errorMessage,
}));

const isNumber = computed(() => props.type === 'number');
const showControls = computed(() => isNumber.value && props.withArrowControls);
const model = ref<string | number>('');

syncRef(toRef(props, 'modelValue'), model, { immediate: true, direction: 'ltr' });

function input() {
  // model type is number when input type = 'number' in browser but not in vitest tests
  if (isNumber.value && model.value !== '') {
    model.value = getNumberInRange(+model.value, props.min, props.max);
  }

  emit('update:modelValue', model.value);
}

function checkChar(e: KeyboardEvent) {
  if (props.skipPattern && e.key.match(props.skipPattern)) e.preventDefault();
}

function incrDecrValue(val: number) {
  model.value = +model.value + val;
  input();
}
</script>

<style lang="scss">
.ui-input {
  width: 100%;

  &-block {
    position: relative;
    display: block;
  }

  &__control-arrows {
    position: absolute;
    top: 4px;
    display: flex;
    flex-direction: column;

    .wf-button {
      color: black;
    }
  }

  &-input,
  &-textarea {
    width: 100%;
    height: 36px;
    padding: 9px 12px;
    font-size: 14px;
    color: white;
    //background: $--2-black;
    border: 1px solid transparent;
    border-radius: 4px;
    transition: 0.5s;

    &::placeholder {
      color: white;
    }
  }

  &-input {
    &:active,
    &:focus {
      background: green;
      border: 1px solid green;
      outline: none;
      box-shadow: 0 0 1px 1px gray;
    }

    &:not(&--spinner) {
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
      }

      &[type='number'] {
        -moz-appearance: textfield; /* Firefox */
      }
    }
  }

  &-textarea {
    height: 83px;
    resize: none;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    //@include thin-scrollbar;

    &:active,
    &:focus {
      background: green;
      border-bottom: 2px solid green;
      outline: none;
      box-shadow: 0 0 1px 1px green;
    }
  }

  &-label {
    display: inline-block;
    margin-bottom: 8px;
    font-size: 12px;
    font-weight: 600;
    color: black;
  }

  &-error-message {
    margin: 10px 0 0;
    //@include error-message-style;
  }

  &--error {
    color: red;
    //background: $--white;
    border: 1px solid red;
    transition: 0.5s;

    &:active,
    &:focus {
      //background: $--error-color-2;
      border: 1px solid red;
      outline: none;
    }
  }

  &--outline &-input,
  &--outline &-textarea {
    //color: $--80-black;
    //background-color: $--white;
    border: 1px solid blue;

    &:active,
    &:focus {
      border: 1px solid green;
      outline: none;
    }
  }

  &--icon-before {
    position: relative;
    display: block;
  }

  &-icon-before {
    position: absolute;
    bottom: 10px;
    z-index: 1000;
    line-height: 1 !important;
    color: black;
    //@include rtl-value(left, right, 12px);
  }
}

.ui-input.focus-within .wf-icon {
  color: green;
}
</style>
