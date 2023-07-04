<template>
  <div class="base-input">
    <label :for="id">{{ label }}</label>

    <div class="input-content">
      <renderedInput
        ref="refInput"
        @input.stop="handleInput"
        @invalid.prevent
        @focus="hasFocus"
        @blur="$emit('onBlur', modelValue)"
        @change="(e) => $emit('onChange', e)"
        @click="(e) => $emit('onClick', e)"
        v-on="on"
      />

      <span class="icon" v-if="type != 'date'">
        <slot name="icon" />
      </span>
    </div>
    <div id="error">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, h } from 'vue';

const refInput = ref(null);
const hasFocused = ref(false);
const autocompleteBackground = ref(true);
const message = ref('');

const props = defineProps({
  modelValue: {
    type: [null, String]
  },
  on: {
    type: Object,
    default: () => ({})
  },
  id: {
    type: String
  },
  label: {
    type: String
  },
  placeholder: {
    type: String
  },
  type: {
    type: String,
    default: 'text'
  },
  autocomplete: {
    type: String,
    default: 'on'
  },
  required: {
    type: Boolean,
    default: false
  },
  pattern: {
    type: String
  },
  value: [String, Number, Date],
  disabled: {
    default: false
  },
  readonly: {
    default: false
  }
});

const renderedInput = () =>
  h(inputType(), {
    class: { input: hasFocused.value },
    ...props,
    value: props.modelValue || props.value,
    rows: 6
  });

const inputType = () => {
  return props.type === 'textarea' ? 'textarea' : 'input';
};

const handleInput = ({ target }) => {
  emit('update:modelValue', target.value);
  if (!target.validity.valid) {
    refInput.value.setCustomValidity('');
    message.value = target.validationMessage;
    return emit('validation', getError(target.validity));
  }
  message.value = '';
  return emit('validation', null);
};

const getError = (validity) => {
  for (let key in validity) {
    if (validity[key]) return key;
  }
};

const setCustomValidity = (customMessage) => {
  autocompleteBackground.value = !customMessage;
  message.value = customMessage;
  return refInput.value.setCustomValidity(customMessage);
};

const hasFocus = (event) => {
  handleInput(event);
  // It will be replaced in the future for "user-invalid" pseudo class in the future
  hasFocused.value = true;
  return emit('focus');
};

const focus = (event) => {
  return refInput.value.focus();
};

const backgroundValid = computed(() => {
  return autocompleteBackground.value ? 'var(--input-secondary)' : 'var(--error-background)';
});

defineExpose({ setCustomValidity, focus });
const emit = defineEmits([
  'update:modelValue',
  'validation',
  'onBlur',
  'focus',
  'onChange',
  'onClick'
]);
</script>

<style lang="less">
.base-input {
  display: inline-block;
  position: relative;
  width: 100%;

  .input-content {
    display: flex;
    align-items: center;
    background: var(--input-secondary);
    border-radius: 0.8rem;

    input,
    textarea {
      width: 100%;
      padding: 2.2rem;
      border-radius: 0.8rem;
      padding-right: 6.4rem;
      background: transparent;
      border: none;
    }

    input:focus-visible,
    textarea:focus-visible {
      outline: 0.2rem solid var(--link-primary);
      border-radius: 0.8rem;
    }

    input:invalid.input,
    textarea:invalid.input {
      background: var(--error-background);
      border-radius: 0.8rem;
    }

    input:invalid:focus-visible.input,
    textarea:invalid:focus-visible.input {
      outline: 2px solid var(--red);
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 40px v-bind(backgroundValid) inset !important;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type='number'] {
      -moz-appearance: textfield;
    }

    input[type='date']::-webkit-calendar-picker-indicator {
      position: absolute;
      cursor: pointer;
      padding: 2rem;
      right: 0;
    }

    input[type='file' i]::-webkit-file-upload-button {
      display: none;
    }
    input[type='file' i] {
      cursor: pointer;
    }

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 0;
      height: 6.6rem;
      width: 6rem;
      cursor: pointer;

      img {
        width: auto;
      }
    }
  }
  & > div#error {
    position: absolute;
    margin-top: 5px;
    padding-left: 2px;

    & > p {
      font-size: 1rem;
      color: var(--red);
    }
  }
}
</style>
