<template>
  <v-data-table
    :headers="productHeaders"
    :items="products"
    :items-per-page="20"
    class="elevation-1"
    :loading="productsLoading"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Producten</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog :value="dialog">
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-on="on"
              @click="setDialog(true)"
            >
              Nieuw product
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <!-- {{ editedProduct }} -->
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      label="Product name"
                      :value="editedProduct.name"
                      :rules="[v => !!v || 'Productnaam is verplicht']"
                      required
                      @input="
                        editProduct({
                          field: 'name',
                          value: $event,
                          subfield: null
                        })
                      "
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-switch
                      input-value="editedProduct.active"
                      class="ma-4"
                      label="Actief"
                      required
                      @change="
                        editProduct({
                          field: 'active',
                          value: $event,
                          subfield: null
                        })
                      "
                    ></v-switch>
                  </v-col>

                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      label="Product price"
                      :value="editedProduct.price"
                      :rules="[v => !!v || 'Prijs is verplicht']"
                      required
                      @input="
                        editProduct({
                          field: 'price',
                          value: $event,
                          subfield: null
                        })
                      "
                    >
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      :value="editedProduct.order"
                      label="Volgorde"
                      required
                      @input="
                        editProduct({
                          field: 'order',
                          value: $event,
                          subfield: null
                        })
                      "
                    >
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12" md="12">
                    <v-switch
                      input-value="editedProduct.extra"
                      class="ma-4"
                      label="Opmerking"
                      required
                      @change="
                        editProduct({
                          field: 'remark',
                          value: $event,
                          subfield: null
                        })
                      "
                    ></v-switch>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    {{ editedProduct }}
                    <v-select
                      :value="editedProduct.type"
                      :items="productTypes"
                      label="Type"
                      required
                      @change="
                        editProduct({
                          field: 'type',
                          value: $event,
                          subfield: null
                        })
                      "
                    ></v-select>
                  </v-col>
                  <v-col>
                    <v-select
                      :value="editedProduct.printer"
                      :items="printers"
                      :rules="[v => !!v || 'Printer is verplicht']"
                      label="Printer"
                      required
                      @change="
                        editProduct({
                          field: 'printer',
                          value: $event,
                          subfield: null
                        })
                      "
                    ></v-select>
                  </v-col>
                  <!-- OPTIONS -->
                  <v-col cols="12" sm="12" md="12">
                    <v-switch
                      :input-value="editedProduct.options.active"
                      class="ma-4"
                      label="Extra Opties"
                      required
                      @change="
                        editProduct({
                          field: 'options',
                          value: $event,
                          subfield: 'active'
                        })
                      "
                    ></v-switch>
                  </v-col>
                  <template v-if="editedProduct.options.active">
                    <v-col cols="10" sm="10" md="10">
                      <v-text-field
                        label="Optie"
                        :value="newOption"
                        @input="
                          setNewOption({
                            value: $event
                          })
                        "
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="2" sm="2" md="2">
                      <v-btn
                        class="ma-2"
                        outlined
                        small
                        fab
                        color="primary"
                        @click="
                          addOption({
                            value: newOption
                          })
                        "
                      >
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-switch
                        :input-value="editedProduct.options.selectMultiple"
                        class="ma-4"
                        label="Meerdere tegelijk mogelijk?"
                        required
                        @change="
                          editProduct({
                            field: 'options',
                            value: $event,
                            subfield: 'selectMultiple'
                          })
                        "
                      ></v-switch>
                    </v-col>
                    <v-container>
                      <v-row
                        v-for="(option, key) in editedProduct.options.value"
                        :key="'productOption-' + key"
                      >
                        <v-col cols="10" sm="10" md="10">
                          <v-text-field
                            label="Optie"
                            :value="option"
                            :rules="[v => !!v || 'Optie is verplicht']"
                            required
                            @input="
                              editOption({
                                value: $event,
                                key: key
                              })
                            "
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="2" sm="2" md="2">
                          <v-btn
                            class="ma-2"
                            outlined
                            small
                            fab
                            color="error"
                            @click="
                              removeOption({
                                value: key
                              })
                            "
                          >
                            <v-icon>mdi-minus</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </template>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDialog">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="saveItem">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    a<template v-slot:item.action="{ item  }">
      <v-icon small class="mr-2" @click="editItem(item)">
        edit
      </v-icon>
      <v-icon small class="mr-2" @click="deleteProduct(item)">
        delete
      </v-icon>
      <v-icon small class="mr-2" @click="move({item: item, direction: -1})">
        Up
      </v-icon>
      <v-icon small @click="move({item: item, direction: 1})">
        Down
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
// import ProductItem from '@/components/ProductItem'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      dialogStatus: false
    }
  },
  computed: {
    ...mapGetters('products', ['isProductDeletionPending']),
    ...mapState('products', [
      'dialog',
      'editedIndex',
      'products',
      'productHeaders',
      'editedProduct',
      'defaultProduct',
      'productTypes',
      'printers',
      'newOption',
      'productsLoading'
    ]),
    ...mapState('app', ['networkOnLine']),
    formTitle() {
      return this.editedIndex === -1 ? 'Nieuw product' : 'Pas product aan'
    }
  },
  methods: {
    ...mapMutations('products', [
      'editProduct',
      'addOption',
      'removeOption',
      'setNewOption',
      'editOption',
      'resetEditedItem',
      'setEditedIndex',
      'setDialog'
    ]),
    ...mapActions('products', [
      'deleteUserProduct',
      'saveProduct',
      'closeDialog',
      'saveItem',
      'editItem',
      'deleteProduct',
      'move'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';
</style>
