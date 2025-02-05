<script setup lang="ts">
import {CircleHelp} from 'lucide-vue-next';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './components/ui/popover'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {Switch} from './components/ui/switch'
import {Input} from './components/ui/input'
import {Label} from "./components/ui/label";
import {Button} from './components/ui/button'
import {Textarea} from '@/components/ui/textarea'
import {Toaster} from '@/components/ui/toast'
import {useToast} from '@/components/ui/toast/use-toast'
import {computed, ref} from "vue";
import axios from "axios";
import titleUnwrapped from "@/assets/SnapanUnwrappedLove 1.png"
import ProductCard from "@/components/ProductCard.vue";
import PaketCocwit from "@/assets/bunga rajut coklat surat.png";
import PaketHTS from "@/assets/bunga rajut surat.png";
import PaketBackburner from "@/assets/bunga surat.png";
import PaketCLBK from "@/assets/bunga coklat surat.png";

const {toast} = useToast()
const username = ref<string>("");
const gradeUser = ref<string>("");
const isOpen = ref<boolean>(false)
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
}

const inputName = ref<inputNameProps[]>([
  {name: "Nama", entry: "entry.1776388329", type: "text", placeholder: "Jhon Doe", value: ""},
  {name: "Kelas", entry: "entry.871317360", type: "text", placeholder: "XI DKV 4", value: ""},
  {name: "Nomor HP", entry: "entry.610481337", type: "tel", placeholder: "+62XXXXXXXXX", value: ""},
])

const products = ref<ProductCardProps[]>([
  {
    id: 1,
    name: "Paket Cocwit",
    price: "30k",
    img: PaketCocwit,
    entry: "entry.1085764745",
    isRajut: true,
    totalProduct: 0,
    colorProduct: "Merah",
    colorEntry: "entry.146196698",
    description: "Surat + Bunga Rajut + Coklat"
  },
  {
    id: 2,
    name: "Paket HTS",
    price: "17k",
    img: PaketHTS,
    entry: "entry.1470818403",
    isRajut: true,
    totalProduct: 0,
    colorProduct: "Merah",
    colorEntry: "entry.273963718",
    description: "Surat + Bunga Rajut "
  },
  {
    id: 3,
    name: "Paket Backburner",
    price: "12k",
    img: PaketBackburner,
    entry: "entry.1709928226",
    isRajut: false,
    totalProduct: 0,
    colorProduct: "Merah",
    colorEntry: "entry.591189756",
    description: "Surat + Bunga Asli "
  },
  {
    id: 4,
    name: "Paket CLBK",
    price: "25k",
    img: PaketCLBK,
    entry: "entry.995144663",
    isRajut: false,
    totalProduct: 0,
    colorProduct: "Merah",
    colorEntry: "entry.135906973",
    description: "Surat + Bunga Asli + Coklat"
  },
]);

const updateUsername = (value: string) => {
  username.value = value;
}

const updateGradeUser = (value: string) => {
  gradeUser.value = value;
}

const hasProductSelected = computed(() => {
  return Boolean(products.value.some(product => product.totalProduct > 0));
})

const submitForm = async (event: Event) => {
  event.preventDefault()

  const formData = new FormData()

  products.value.forEach(product => {
    if (product.totalProduct > 0) {
      formData.append(product.entry, product.totalProduct.toString())
      formData.append(product.colorEntry, product.colorProduct)
    }
  })

  inputName.value.forEach((input) => {
    const inputElement = document.querySelector(`[name="${input.entry}"]`) as HTMLInputElement
    if (inputElement) {
      formData.append(input.entry, inputElement.value)
    }
  })

  if (messageSwitch.value) {
    formData.append("entry.2066764646", message.value)
  }

  if (noteSwitch.value) {
    const receiverNote = document.querySelector(`[name="entry.984193296"]`) as HTMLInputElement
    if (receiverNote) {
      formData.append("entry.984193296", receiverNote.value)
    }
  }

  const note = document.querySelector(`[name="entry.1524280066"]`) as HTMLTextAreaElement
  if (note) {
    formData.append("entry.1524280066", note.value)
  }

  try {
    await axios.post(
        "https://unwrapped-love.vercel.app/api/sendForm",
        formData,
    )
    isOpen.value = true;
    setTimeout(() => window.open(
        `https://wa.me/+62895635004580?text=Halo%20kak%2C%20saya%20${username.value}%20dari%20${gradeUser.value}.%20Sudah%20pesan%20Pre-Order%20Valentine.%20Mohon%20dicek%2C%20terima%20kasih`,
        "_blank",
    ), 1000);
  } catch (error) {
    toast({
      variant: 'destructive',
      title: "Terjadi Kesalahan",
    })
  }
}
</script>

<template>
  <section class="mx-2 my-4 md:w-[778px] md:mx-auto sm:px-4 sm:border-x-4 sm:border-primary sm:p-4 sm:my-0">
    <img :src="titleUnwrapped" alt="Snapan Unwrappd Love" class="mx-auto my-4 px-8 sm:max-w-[500px]">
    <form
        @submit="submitForm"
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
          <Input :type="input.type"
                 class="bg-white"
                 :placeholder="input.placeholder"
                 required
                 :name="input.entry"
                 v-model="input.value"
                 @input="input.name === 'Nama' ? updateUsername(input.value) : input.name === 'Kelas' ? updateGradeUser(input.value) : null"
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
          <Label>Catatan</Label>
          <Textarea class="bg-white" placeholder="ex: bunganya merah sama putih" name="entry.1524280066"/>
        </div>

        <Button class="hover:bg-[#c07299]" :disabled="!hasProductSelected" type="submit">Kirim</Button>

        <Dialog v-model:open="isOpen">
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Terimaksih, {{ username }}</DialogTitle>
              <DialogDescription>Pesanan Anda sedang diproses. Jika pesan tidak terkirim otomatis, tekan tombol di bawah
                ini. Terima kasih!
              </DialogDescription>
            </DialogHeader>
            <a :href="`https://wa.me/+62895635004580?text=Halo%20kak%2C%20saya%20${username}.%20Sudah%20pesan%20Pre-Order%20Valentine.%20Mohon%20dicek%2C%20terima%20kasih`"
               class="bg-[#25d366] text-white py-2 px-4 rounded-lg font-semibold border-2 border-black text-center">Whatsapp</a>
          </DialogContent>
        </Dialog>
      </div>
    </form>
    <Toaster/>
  </section>
</template>
