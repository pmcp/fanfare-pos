<template>
  <v-card class="mx-auto" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-container fluid>
          <v-row align="center" no-gutters justify="space-between" class="ma-0">
            <v-col cols="2">
              {{ activeOrder.products[product.printer][product.id].value }}
            </v-col>
            <v-col class="flex-grow-1">
              <span>{{ product.name }}</span>
            </v-col>

            <v-col cols="3" align-self="end" class="flex-shrink-1">
              <v-btn
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
                    value: 1
                  })
                "
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <div v-if="product.options.active">
           <v-radio-group
            v-for="(productOptions, k) in activeOrder.products[product.printer][product.id].options"
            :key="`choice-${k}`"
            :value="activeOrder.products[product.printer][product.id].options[k]"
            @change="setActiveOrderOption({ value: $event, product, option: productOptions })"
            mandatory
            row
          >
            <v-radio v-for="(option, y) in product.options.value" :key="`choice-${k}-option-${y}`" :label="option"></v-radio>
          </v-radio-group>

        </div>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>Opmerking</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-textarea
                :value="activeOrder.products[product.printer][product.id].remark"
                name="product-remark"
                @input="setProductRemark({ value: $event, product })"
              ></v-textarea>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-list-item-content>
    </v-list-item>
  </v-card>
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
    ...mapActions('orders', ['changeProductToActiveOrder', 'setProductRemark', 'setActiveOrderOption'])
  }
}
</script>
