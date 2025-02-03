<script setup lang="ts">
import {CircleHelp} from 'lucide-vue-next';
import {Switch} from './components/ui/switch'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './components/ui/popover'
import {Input} from './components/ui/input'
import {Label} from "./components/ui/label";
import {Button} from './components/ui/button'
import {ref} from "vue";
import titleUnwrapped from "@/assets/SnapanUnwrappedLove 1.png"
import ProductCard from "@/components/ProductCard.vue";

const messageSwitch = ref(false)
const noteSwitch = ref(false)
const message = ref(`Dear ...

From...
`)


const inputFile = [
  {name: "Nama", entry: "entry.77186628", type: "text", placeholder: "Jhon Doe"},
  {name: "Kelas", entry: "entry.1277294301", type: "text", placeholder: "X PS 3"},
  {name: "Nomor HP", entry: "entry.215099139", type: "tel", placeholder: "+62XXXXXXXXX"},
]
</script>

<template>
  <section class="mx-4 my-4 md:w-[778px] md:mx-auto px-4 sm:border-4 sm:border-primary sm:p-4 sm:my-0 rounded-lg">
    <img :src="titleUnwrapped" alt="Snapan Unwrappd Love" class="mx-auto my-4 px-8 sm:max-w-[500px]">
    <form
        action="https://docs.google.com/forms/d/e/1FAIpQLSf5U07LOD3-V1ucoGG3vngtmcuDGvbQGqV_GkYDLlQL6735zQ/formResponse"
        class="grid gap-6"
    >
      <div class="grid gap-2">
        <h2 class="text-center text-xl font-bold">Pilih Produk Anda</h2>
        <div class="flex justify-start items-center gap-2">
          <div class="bg-red-500 w-4 h-4 rounded-full"/>
          <p class="text-red-500 font-bold text-sm">= Stok Terbatas</p>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-2 sm:gap-4">
          <ProductCard/>
        </div>
      </div>

      <div v-for="input in inputFile" class="grid gap-2">
        <Label class="">{{ input.name }}</Label>
        <Input :type="input.type"
               class="bg-white"
               :placeholder="input.placeholder"
               required
               :name="input.entry"
        />
      </div>

      <div class="bg-white py-2 px-3 flex justify-between items-center rounded-md border border-stone-200 space-x-2">
        <div class="flex gap-2 justify-center items-center">
          <Label class="">
            Menggunakan surat?
          </Label>

          <Popover>
            <PopoverTrigger>
              <CircleHelp/>
            </PopoverTrigger>

            <PopoverContent class="bg-primary">
              <p class="font-semibold text-white text-sm">
                Jika hanya ingin surat kosongan bisa dicentang lalu kosongkan isinya
              </p>
            </PopoverContent>
          </Popover>
        </div>

        <Switch v-model:checked="messageSwitch" id="messageSwitch"/>
      </div>

      <div v-if="messageSwitch" class="">
        <Label class="">Surat</Label>
        <textarea v-model="message" placeholder="add multiple lines"
                  class="bg-[#F9F6EE] w-full py-2 px-3 rounded-md border border-stone-200 space-x-2 "
                  rows="5"
                  name="entry.2124438820"
        />

        <Label class="mt-3 ">Preview Surat</Label>
        <div class="rounded-xl p-4 shadow-md bg-white border-2 border-primary ">
          <p class="whitespace-pre-line">{{ message }}</p>
        </div>
      </div>

      <div class="bg-white py-2 px-3 flex justify-between items-center rounded-md border border-stone-200 space-x-2">
        <div class="flex gap-2 justify-center items-center">
          <Label class="">
            Paket diantar?
          </Label>

          <Popover>
            <PopoverTrigger>
              <CircleHelp/>
            </PopoverTrigger>
            <PopoverContent class="bg-primary">
              <p class="font-semibold text-white text-sm">
                Mau pesananmu langsung dikirim ke orangnya? Tenang! Kami bisa mengantarkannya untukmu.
              </p>
            </PopoverContent>
          </Popover>
        </div>

        <Switch v-model:checked="noteSwitch" id="noteSwitch"/>
      </div>

      <div v-if="noteSwitch" class="grid gap-2">
        <Label class="font-semibold text-sm leading-none peer-disabled:cursor-not-allowed">
          Catatan (jika diantar)
        </Label>
        <div class="">
          <Input type="text"
                 class="bg-[#F9F6EE] "
                 placeholder="ex: dikasih ke Siti, XI DKV 1"
                 name="entry.1082695861"
          />
          <p class="text-[12px]">Berikan catatan yang jelas agar pengirim tidak kebingugan</p>
        </div>
      </div>

      <Button class="hover:bg-input" type="submit">Kirim</Button>
    </form>
  </section>
</template>
