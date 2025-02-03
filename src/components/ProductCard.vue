<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput
} from "@/components/ui/number-field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {ref} from "vue";
import PaketBackburner from "@/assets/bunga surat.png";
import PaketCLBK from "@/assets/bunga coklat surat.png";
import PaketHTS from "@/assets/bunga rajut surat.png";
import PaketCocwit from "@/assets/bunga rajut coklat surat.png";

const products = ref([
  {
    id: 1,
    name: "Paket Cocwit",
    price: "30k",
    img: PaketCocwit,
    entry: "entry.1934597340",
    isRajut: true,
    totalProduct: 0,
    colorProduct: "merah",
    description: "Surat + Bunga Rajut + Coklat"
  },
  {
    id: 2,
    name: "Paket HTS",
    price: "17k",
    img: PaketHTS,
    entry: "entry.1108135607",
    isRajut: true,
    totalProduct: 0,
    colorProduct: "merah",
    description: "Surat + Bunga Rajut "
  },
  {
    id: 3,
    name: "Paket Backburner",
    price: "12k",
    img: PaketBackburner,
    entry: "entry.652612373",
    isRajut: false,
    totalProduct: 0,
    colorProduct: "merah",
    description: "Surat + Bunga Asli "
  },
  {
    id: 4,
    name: "Paket CLBK",
    price: "25k",
    img: PaketCLBK,
    entry: "entry.642255595",
    isRajut: false,
    totalProduct: 0,
    colorProduct: "merah",
    description: "Surat + Bunga Asli + Coklat"
  },
]);
</script>

<template>
  <div v-for="product in products" :key="product.name" class="relative p-2 duration-300"
       :class="product.totalProduct > 0 ? 'border-4 border-primary rounded-lg ' : ''">
    <img :src="product.img" :alt="`Gambar ${product.name}`" class="">

    <div class="absolute z-10 top-2 sm:right-0" :class="product.id % 2 ? 'right-0' : 'max-sm:left-0'">
      <div class="heart-shape w-16 h-16" :class="product.isRajut ? 'bg-red-500' : 'bg-primary'"/>
      <h2 class="text-2xl font-extrabold text-white absolute top-1 left-1">{{ product.price }}</h2>
    </div>

    <div class="grid gap-1 w-full">
      <div
          class="bg-white p-2 border-2 border-dashed border-primary rounded-lg text-center text-sm w-full min-h-[72px]">
        <h1 class="text-sm font-extrabold text-[#81bfd9] leading-4 mb-1">{{ product.name }}</h1>
        <p class="text-xs">{{ product.description }}</p>
      </div>

      <NumberField id="Jumlah"
                   :min="0"
                   :max="10"
                   v-model="product.totalProduct"
      >
        <NumberFieldContent>
          <NumberFieldDecrement/>
          <NumberFieldInput class="bg-white" :name="product.entry"/>
          <NumberFieldIncrement/>
        </NumberFieldContent>
      </NumberField>


      <Select v-if="product.totalProduct > 0" v-model="product.colorProduct" :name="product.isRajut ? 'entry.1140270331' : 'entry.450064450' ">
        <SelectTrigger class="bg-white">
          <SelectValue placeholder="Warna bunga"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="merah">
              Merah
            </SelectItem>
            <SelectItem value="putih">
              Putih
            </SelectItem>
            <SelectItem v-if="product.isRajut" value="Pink">
              Pink
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>

<style scoped>

</style>