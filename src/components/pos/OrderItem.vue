<template>
  <v-container fluid>
    <v-btn color="success">Send Order</v-btn>
    <v-row align="center" no-gutters justify="space-between" class="ma-0">
      <v-col cols="2">
        {{ activeOrder.products[product.printer][product.id].value }}
      </v-col>
      <v-col class="flex-grow-1">
        <span>{{ product.name }}</span>
      </v-col>

      <v-col cols="3" align-self="end" class="flex-shrink-1">
        <v-btn
          v-if="!product.options.active"
          class="ma-3"
          depressed
          large
          @click="
            changeProductToActiveOrder({
              product: product,
              value: -1
            })
          "
          ><v-icon>mdi-minus</v-icon></v-btn
        >
        <v-btn
          depressed
          large
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
      </v-col>
      </v-row>
      <div v-if="product.options.active">
        <v-row v-for="(productOptions, k) in activeOrder.products[product.printer][product.id].options" :key="`productOptions-${k}`">

          <v-col cols="8" >
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
                row
              >
                <v-radio v-for="(option, y) in product.options.value" :value="y" :key="`choice-${k}-option-${y}`" :label="option"></v-radio>
              </v-radio-group>
            </div>
          </v-col>
          <v-col cols="4">
            <v-btn
              class="ma-3"
              depressed
              large
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


    <v-expansion-panels flat>
      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate>
          Opmerking
          <template v-slot:actions>
            <v-icon color="error">mdi-alert-circle</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-textarea
            :value="activeOrder.products[product.printer][product.id].remark"
            name="product-remark"
            @input="setProductRemark({ value: $event, product })"
          ></v-textarea>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
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
