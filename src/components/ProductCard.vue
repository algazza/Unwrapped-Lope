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

type ProductCardProps = {
  id: number;
  name: string;
  price: string;
  img: string;
  entry: string;
  isRajut: boolean;
  totalProduct: number;
  colorProduct: string;
  colorEntry: string;
  description: string;
  isReady: boolean;
}

defineProps<{data: ProductCardProps[]}>()
</script>

<template>
  <div v-for="product in data" :key="product.name" class="relative p-2 duration-300"
       :class="[product.totalProduct > 0 ? 'border-4 border-primary rounded-lg ' : '', product.isReady ? '' : 'grayscale']"
  >
    <img :src="product.img" :alt="`Gambar ${product.name}`">

    <div class="absolute z-10 top-2 sm:right-0" :class="product.id % 2 ? 'right-0' : 'max-sm:left-0'">
      <div class="heart-shape w-16 h-16 bg-primary" />
      <h2 class="text-2xl font-extrabold text-white absolute top-1 left-1">{{ product.price }}</h2>
    </div>

    <div class="grid gap-1.5 w-full">
      <div
          class="bg-white p-2 border-2 border-dashed border-primary rounded-lg text-center text-sm w-full min-h-[88px]">
        <h1 class="text-sm font-extrabold text-[#81bfd9] leading-4 mb-1">{{ product.name }}</h1>
        <p class="text-xs">{{ product.description }}</p>
        <p v-if="product.isRajut" class="text-xs text-red-500 font-bold">Stok habis</p>
      </div>

      <NumberField id="Jumlah"
                   :min="0"
                   :max="10"
                   v-model="product.totalProduct"
                   :disabled="!product.isReady"
      >
        <NumberFieldContent>
          <NumberFieldDecrement/>
          <NumberFieldInput class="bg-white" :name="product.entry"/>
          <NumberFieldIncrement/>
        </NumberFieldContent>
      </NumberField>


      <Select v-if="product.totalProduct > 0" v-model="product.colorProduct" :name="product.colorEntry">
        <SelectTrigger class="bg-white" >
          <SelectValue placeholder="Warna bunga"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-if="!product.isRajut" value="Merah">
              Merah
            </SelectItem>
            <SelectItem value="Putih">
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