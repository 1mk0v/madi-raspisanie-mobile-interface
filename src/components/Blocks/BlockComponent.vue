<template>
    <div 
      :class="activeClass"
      :style="customStyles"
      @click="eventHandler">
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        defaultFontSize: '16px',
        defaultFontWeight: '400',
        defaultBlockPadding: '10px 10px',
        defaultBorderRadius: '10px',
        defaultBackgroundColor: 'rgba(0,0,0,0.0)'
      }
    },
    props: {
      nameId: [String, Number],
      backgroundColor: String,
      flexAuto: Boolean,
      isButton: Boolean,
      justifyContent: String,
      flexDirection: String,
      blockPadding: String,
      borderRadius: String,
      textAlign: String,
      textSize: String,
      textWeight: String
    },
    emits: ['clickComponentEvent'],
    name: 'DataBlock',
    methods: {
      clickEvent(event) {
        let data = {"id": this.nameId, "value": event.target.innerText }
        return this.$emit('clickComponentEvent', data)
      }
    },
    computed: {
      customStyles() {
        return {
          'flex': (this.flexAuto) ? '1 1 auto' : 'none',
          'cursor': (this.isButton) ? 'pointer' : 'default',
          'background-color': (this.backgroundColor) ? this.backgroundColor : null,
          'border-radius': this.borderRadius || this.defaultBorderRadius,
          'padding': this.blockPadding || this.defaultBlockPadding,
          'flexDirection': this.flexDirection || 'column',
          'justifyContent': this.justifyContent || 'center',
          'alignSelf': this.textAlign,
          'fontSize': this.textSize || this.defaultFontSize,
          'fontWeight': this.textWeight || this.defaultFontWeight
        }
      },
      activeClass() {
        return this.isButton ? 'key-container' : 'key-container-none-button'
      },
      eventHandler() {
        return this.isButton ? this.clickEvent : null
      }
    }
  }
  </script>
  
  <style scoped>
  .key-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-direction: column;
  }
  
  .key-container:active {
      background: rgba(0,0,0,0.15);
      transition: all 100ms linear;
  }
  
  .key-container-none-button {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-direction: column;
  }
  </style>%                                                                                                                                                                 