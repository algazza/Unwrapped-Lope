<script setup lang="ts">
import {CircleHelp} from 'lucide-vue-next';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './components/ui/popover'
import {Switch} from './components/ui/switch'
import {Input} from './components/ui/input'
import {Label} from "./components/ui/label";
import {Button} from './components/ui/button'
import {Textarea} from '@/components/ui/textarea'
import {Toaster} from '@/components/ui/toast'
import {computed, ref} from "vue";
import titleUnwrapped from "@/assets/SnapanUnwrappedLove 1.png"
import ProductCard from "@/components/ProductCard.vue";
import PaketCocwit from "@/assets/bunga rajut coklat surat.png";
import PaketHTS from "@/assets/bunga rajut surat.png";
import PaketBackburner from "@/assets/bunga surat.png";
import PaketCLBK from "@/assets/bunga coklat surat.png";
import ClosePage from "@/view/ClosePage.vue";

const username = ref<string>("");
const gradeUser = ref<string>("");
const messageSwitch = ref<boolean>(false)
const noteSwitch = ref<boolean>(false)
const message = ref<string>(`Dear:
Message:

`)

type inputNameProps = {
  name: string;
  entry: string;
  type: string;
  placeholder: string;
  value: string;
}

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

const inputName = ref<inputNameProps[]>([
  {name: "Nama", entry: "entry.1776388329", type: "text", placeholder: "Jhon Doe", value: ""},
  {name: "Kelas", entry: "entry.871317360", type: "text", placeholder: "XI DKV 4", value: ""},
  {name: "Nomor HP", entry: "entry.610481337", type: "tel", placeholder: " 62XXXXXXXXX", value: ""},
])

const products = ref<ProductCardProps[]>([
  {
    id: 3,
    name: "Paket Backburner",
    price: "12k",
    img: PaketBackburner,
    entry: "entry.1709928226",
    isRajut: false,
    totalProduct: 0,
    colorProduct: "Putih",
    colorEntry: "entry.591189756",
    description: "Surat + Bunga Asli ",
    isReady: true
  },
  {
    id: 4,
    name: "Paket CLBK",
    price: "25k",
    img: PaketCLBK,
    entry: "entry.995144663",
    isRajut: false,
    totalProduct: 0,
    colorProduct: "Putih",
    colorEntry: "entry.135906973",
    description: "Surat + Bunga Asli + Coklat",
    isReady: true
  },
  {
    id: 1,
    name: "Paket Cocwit",
    price: "30k",
    img: PaketCocwit,
    entry: "entry.1085764745",
    isRajut: true,
    totalProduct: 0,
    colorProduct: "Pink",
    colorEntry: "entry.146196698",
    description: "Surat + Bunga Rajut + Coklat",
    isReady: false
  },
  {
    id: 2,
    name: "Paket HTS",
    price: "17k",
    img: PaketHTS,
    entry: "entry.1470818403",
    isRajut: true,
    totalProduct: 0,
    colorProduct: "Pink",
    colorEntry: "entry.273963718",
    description: "Surat + Bunga Rajut ",
    isReady: false
  },
]);

const updateUsername = (value: string) => {
  username.value = value;
}

const updateGradeUser = (value: string) => {
  gradeUser.value = value;
}

const allFilled = computed(() => {
  return Boolean(inputName.value.every(input => input.value.trim() !== ""));
})

const hasProductSelected = computed(() => {
  return Boolean(products.value.some(product => product.totalProduct > 0));
})

const handleSubmit = (event: Event) => {
  const form = event.target as HTMLFormElement;

  if (!hasProductSelected.value || !allFilled.value) return;

  form.submit();

  setTimeout(() => {
    window.location.href = `https://wa.me/+62895635004580?text=Halo%20kak%2C%20saya%20${username.value}%20dari%20${gradeUser.value}.%20Sudah%20pesan%20Pre-Order%20Valentine.%20Mohon%20dicek%2C%20terima%20kasih`;
  }, 500);
};

</script>

<template>
  <section class="mx-2 my-4 md:w-[778px] md:mx-auto sm:px-4 sm:border-x-4 sm:border-primary sm:p-4 sm:my-0">
    <img :src="titleUnwrapped" alt="Snapan Unwrappd Love" class="mx-auto my-4 px-8 sm:max-w-[500px]">
    <form
        action="https://docs.google.com/forms/d/e/1FAIpQLSehKCDQre_TIBybzj_r2n4sKmQq2PwlppMrwWrYIfb4_e12CA/formResponse"
        @submit.prevent="handleSubmit"
    >
      <div class="grid gap-2">
        <h2 class="text-center text-xl font-bold">Pilih Produk Anda</h2>
        <div class="grid grid-cols-2 py-4 sm:grid-cols-3 md:grid-cols-4 gap-y-2 sm:gap-4">
          <ProductCard :data="products"/>
        </div>
      </div>

      <div class="grid gap-6 mx-2">
        <div v-for="input in inputName" class="grid gap-2">
          <Label class="">{{ input.name }}</Label>
          <div class="">
            <Input :type="input.type"
                   class="bg-white"
                   :placeholder="input.placeholder"
                   required
                   :name="input.entry"
                   v-model="input.value"
                   @input="input.name === 'Nama' ? updateUsername(input.value) : input.name === 'Kelas' ? updateGradeUser(input.value) : null"
            />
            <p v-if="input.name === 'Nomor HP' " class="text-[12px]">Jangan gunakan spasi atau strip(-), format sesuai contoh</p>
          </div>
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
          <Textarea v-model="message" placeholder="add multiple lines"
                    class="bg-[#F9F6EE] "
                    rows="5"
                    name="entry.2066764646"
          />
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
          <Label class="">
            Keteragan Penerima
          </Label>
          <div class="">
            <Input type="text"
                   class="bg-white"
                   placeholder="ex: dikasih ke Siti, XI DKV 1"
                   name="entry.984193296"
            />
            <p class="text-[12px]">Berikan catatan yang jelas agar pengirim tidak kebingugan</p>
          </div>
        </div>

        <div class="grid gap-2">
          <Label>Catatan tambahan</Label>
          <Textarea class="bg-white" placeholder="ex: bunganya merah sama putih, suratnya kosongin aja" name="entry.1524280066"/>
        </div>

        <Button class="hover:bg-[#c07299]" :disabled="!hasProductSelected || !allFilled" type="submit">
          Kirim
        </Button>

      </div>
    </form>
    <Toaster/>
  </section>
</template>
