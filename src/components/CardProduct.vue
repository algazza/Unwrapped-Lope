<script setup lang="ts">

import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Card, CardContent} from "@/components/ui/card";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput
} from "@/components/ui/number-field";
import {Button} from "@/components/ui/button";
import {Badge} from '@/components/ui/badge'

import {ref} from "vue";
import paketBunga from "@/assets/paketBunga.webp";


const products = ref([
  {
    name: "Paket CLBK",
    price: 12000,
    img: paketBunga,
    entry: "entry.652612373",
    isRajut: false,
    totalProduct: 0,
    colorProduct: "merah",
    description: "Surat + Bunga Asli "
  },
  {
    name: "Paket Backburner",
    price: 25000,
    img: paketBunga,
    entry: "entry.642255595",
    isRajut: false,
    totalProduct: 0,
    colorProduct: "merah",
    description: "Surat + Bunga Asli + Coklat"
  },
  {
    name: "Paket HTS",
    price: 17000,
    img: paketBunga,
    entry: "entry.1108135607",
    isRajut: true,
    totalProduct: 0,
    colorProduct: "merah",
    description: "Surat + Bunga Rajut "
  },
  {
    name: "Paket Cocwit",
    price: 30000,
    img: paketBunga,
    entry: "entry.1934597340",
    isRajut: true,
    totalProduct: 0,
    colorProduct: "merah",
    description: "Surat + Bunga Rajut + Coklat"
  }
]);
</script>

<template>
  <Card v-for="product in products" :key="product.name" class="rounded-lg shadow-sm">
    <CardContent class="p-3 grid gap-2">
      <div class="relative w-full">
        <img :src="product.img" :alt="`Gambar ${product.name}`"
             class="object-cover rounded-lg"/>
      </div>
      <div class="">
        <h2 class="text-sm font-semibold ">{{ product.name }}</h2>
        <p class="text-xs">Surat + Bunga + Coklat</p>
      </div>
      <p class="text-sm font-semibold">Rp.{{ product.price.toLocaleString("ID") }}</p>
      <Badge v-if="product.totalProduct > 0" class="text-xs bg-slate-400">
        {{ `${product.totalProduct} Paket, Bunga ${product.colorProduct}` }}
      </Badge>
      <Dialog>
        <DialogTrigger>
          <Button type="button" class="w-full bg-transparent" variant="outline">
            {{ product.totalProduct > 0 ? "Edit Paket" : "Pesan" }}
          </Button>
        </DialogTrigger>
        <DialogContent class="bg-white">
          <DialogHeader class="font-bold">{{ product.name }}</DialogHeader>

          <NumberField id="Jumlah"
                       :min="0"
                       :max="10"
                       v-model="product.totalProduct"
                       class="grid grid-cols-4 items-center gap-4"
                       :name="product.entry"
          >
            <Label for="Jumlah">Jumlah</Label>

            <NumberFieldContent class="col-span-3">
              <NumberFieldDecrement/>
              <NumberFieldInput class="bg-white"/>
              <NumberFieldIncrement/>
            </NumberFieldContent>
          </NumberField>

          <div class="grid gap-4 items-center grid-cols-4">
            <Label for="warna">Warna Bunga</Label>

            <RadioGroup default-value="merah" class="flex col-span-3"
                        :class="product.isRajut ? 'justify-beetwen' : 'gap-10'" v-model="product.colorProduct"
                        :name="product.isRajut ? 'entry.1140270331' : 'entry.450064450' ">
              <div class="flex items-center space-x-2">
                <RadioGroupItem value="merah"/>
                <Label for="merah">Merah</Label>
              </div>
              <div class="flex items-center space-x-2">
                <RadioGroupItem value="putih"/>
                <Label for="putih">Putih</Label>
              </div>
              <div v-if="product.isRajut" class="flex items-center space-x-2">
                <RadioGroupItem value="pink"/>
                <Label for="pink">Pink</Label>
              </div>
            </RadioGroup>
          </div>
        </DialogContent>
      </Dialog>
    </CardContent>
  </Card>
</template>

<style scoped>

</style>