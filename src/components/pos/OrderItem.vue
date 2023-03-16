<template>
  <v-container fluid class="pa-4">
    <v-layout row style="flex-direction:column">
      <div class="item">
        <div class="item_text" style="margin-top:6px;">
          <div class="item_textContainer">
            <span class="body-1" >{{ product.name }}</span>
          </div>
        </div>
          <span class="font-weight-black text-center" style="padding-left:20px;padding-top: 6px;padding-right:20px; ">{{ activeOrder.products[product.printer][product.id].value }}</span>
          <v-btn
            v-if="!product.options.active"
            depressed

            :class="{ 'lighten-4': activeOrder.products[product.printer][product.id].value === 0}"
            class="mr-2 red"
            style="padding: 6px 0;min-width:48px"
            @click="
          changeProductToActiveOrder({
            product: product,
            value: -1
          })
        "
          ><v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-btn
            depressed
            color="green"
            style="padding: 6px 0;min-width:48px"
            @click="
          changeProductToActiveOrder({
            product: product,
            value: 1,
            position: false
          })
        "
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>


      <div v-if="product.options.active" style="width:100%">
        <v-row v-for="(productOptions, k) in activeOrder.products[product.printer][product.id].value" :key="`productOptions-${k}`" >
          <v-col cols="9" class="grey-lighten-3 ma-0 pa-0 pl-2 justify-space-around ">
            <div v-if="product.options.selectMultiple">
              <v-checkbox
                v-for="(option, y) in product.options.value"
                :value="true"
                :key="`choice-checkbox-option-${y}`"
                :label="option"
                @change="setActiveOrderOption({ value: option, product, option: k, multiple: true })"
              >
              </v-checkbox>
            </div>
            <div v-else>
              <v-radio-group
                :value="activeOrder.products[product.printer][product.id].options[k]"
                @change="setActiveOrderOption({ value: $event, product, option: k, multiple: false })"

              >

                <v-radio v-for="(option, y) in product.options.value" :value="option" :key="`choice-${k}-option-${y}`" :label="option">
                </v-radio>
              </v-radio-group>
            </div>
          </v-col>
          <v-col cols="3" class="text-right">
            <v-btn
              class="mt-3 red"
              depressed
              small
              @click="
              changeProductToActiveOrder({
                product: product,
                value: -1,
                position: k
              })
            "
            ><v-icon>mdi-minus</v-icon></v-btn
            >
          </v-col>
        </v-row>
    </div>
    </v-layout>
    <v-layout row v-if="product.remark && activeOrder.products[product.printer][product.id].value > 0">
      <v-flex
        grow
        pt-3
      >
        <v-textarea

          filled
          :value="activeOrder.products[product.printer][product.id].remark"
          name="product-remark"
          @input="setProductRemark({ value: $event, product })"
        ></v-textarea>
      </v-flex>
    </v-layout>
  </v-container>



       
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters('orders', ['inActiveOrder']),
    ...mapState('orders', ['activeOrder'])
  },
  methods: {
    ...mapActions('orders', [
      'changeProductToActiveOrder',
      'setProductRemark',
      'setActiveOrderOption'
    ])
  }
}
</script>

<style scoped>
.item {
  display: flex;
  width: 100%;

}

.item_text {
  min-width: 50%;
  flex-grow: 1;
}

.item_textContainer {
  white-space:nowrap;
  overflow-x: auto;
}
</style>