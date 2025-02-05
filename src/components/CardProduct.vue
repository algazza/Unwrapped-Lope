<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const products = ref([
  {
    id: 1,
    name: "Produk A",
    img: "https://via.placeholder.com/150",
    price: "100.000",
    totalProduct: 0,
    isRajut: true,
    colorProduct: "",
    entry: "entry.1234567890", // Ganti dengan entry Google Form
    colorEntry: "entry.0987654321", // Ganti dengan entry Google Form
  },
  // Tambahkan produk lainnya
]);

const inputFile = ref([
  {
    name: "Nama",
    type: "text",
    placeholder: "Masukkan Nama",
    entry: "entry.1122334455", // Ganti dengan entry Google Form
  },
  {
    name: "Email",
    type: "email",
    placeholder: "Masukkan Email",
    entry: "entry.5566778899", // Ganti dengan entry Google Form
  },
]);

const messageSwitch = ref(false);
const message = ref("");
const noteSwitch = ref(false);
const hasProductSelected = computed(() => products.value.some((p) => p.totalProduct > 0));

const submitForm = async (event) => {
  event.preventDefault(); // Mencegah form redirect ke Google Form

  const formData = new FormData();

  // Menambahkan produk yang dipilih
  products.value.forEach((product) => {
    if (product.totalProduct > 0) {
      formData.append(product.entry, product.totalProduct);
      if (product.colorProduct) {
        formData.append(product.colorEntry, product.colorProduct);
      }
    }
  });

  // Menambahkan input lainnya
  inputFile.value.forEach((input) => {
    const inputElement = document.querySelector(`[name="${input.entry}"]`);
    if (inputElement) {
      formData.append(input.entry, inputElement.value);
    }
  });

  // Menambahkan opsi surat
  if (messageSwitch.value) {
    formData.append("entry.2066764646", message.value);
  }

  // Menambahkan opsi keterangan penerima
  if (noteSwitch.value) {
    const receiverNote = document.querySelector(`[name="entry.984193296"]`);
    if (receiverNote) {
      formData.append("entry.984193296", receiverNote.value);
    }
  }

  // Menambahkan catatan
  const note = document.querySelector(`[name="entry.1524280066"]`);
  if (note) {
    formData.append("entry.1524280066", note.value);
  }

  try {
    await axios.post(
        "https://docs.google.com/forms/d/e/1FAIpQLSehKCDQre_TIBybzj_r2n4sKmQq2PwlppMrwWrYIfb4_e12CA/formResponse",
        formData
    );

    // Redirect ke halaman sukses setelah submit
    router.push("/thank-you");
  } catch (error) {
    console.error("Gagal mengirim form:", error);
    alert("Terjadi kesalahan, coba lagi.");
  }
};
</script>

<template>
  <form @submit="submitForm">
    <div class="grid gap-2">
      <h2 class="text-center text-xl font-bold">Pilih Produk Anda</h2>
      <div class="grid grid-cols-2 py-4 sm:grid-cols-3 md:grid-cols-4 gap-y-2 sm:gap-4">
        <div
            v-for="product in products"
            :key="product.name"
            class="relative p-2 duration-300"
            :class="product.totalProduct > 0 ? 'border-4 border-primary rounded-lg ' : ''"
        >
          <img :src="product.img" :alt="`Gambar ${product.name}`" />

          <div class="absolute z-10 top-2 sm:right-0" :class="product.id % 2 ? 'right-0' : 'max-sm:left-0'">
            <div class="heart-shape w-16 h-16 bg-primary" />
            <h2 class="text-2xl font-extrabold text-white absolute top-1 left-1">{{ product.price }}</h2>
          </div>

          <div class="grid gap-1.5 w-full">
            <div class="bg-white p-2 border-2 border-dashed border-primary rounded-lg text-center text-sm w-full min-h-[88px]">
              <h1 class="text-sm font-extrabold text-[#81bfd9] leading-4 mb-1">{{ product.name }}</h1>
              <p class="text-xs">Deskripsi produk</p>
              <p v-if="product.isRajut" class="text-xs text-red-500 font-bold">Stok terbatas</p>
            </div>

            <input type="number" v-model="product.totalProduct" :min="0" :max="10" :name="product.entry" class="border p-2"/>

            <select v-if="product.totalProduct > 0" v-model="product.colorProduct" :name="product.colorEntry" class="border p-2">
              <option value="Merah">Merah</option>
              <option value="Putih">Putih</option>
              <option v-if="product.isRajut" value="Pink">Pink</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-6 mx-2">
      <div v-for="input in inputFile" class="grid gap-2">
        <label>{{ input.name }}</label>
        <input :type="input.type" class="border p-2" :placeholder="input.placeholder" required :name="input.entry" />
      </div>

      <div class="bg-white py-2 px-3 flex justify-between items-center rounded-md border border-stone-200 space-x-2">
        <label>Menggunakan surat?</label>
        <input type="checkbox" v-model="messageSwitch" />
      </div>

      <div v-if="messageSwitch">
        <label>Surat</label>
        <textarea v-model="message" class="border p-2" rows="5" name="entry.2066764646"></textarea>
      </div>

      <div class="bg-white py-2 px-3 flex justify-between items-center rounded-md border border-stone-200 space-x-2">
        <label>Paket diantar?</label>
        <input type="checkbox" v-model="noteSwitch" />
      </div>

      <div v-if="noteSwitch">
        <label>Keterangan Penerima</label>
        <input type="text" class="border p-2" placeholder="ex: dikasih ke Siti, XI DKV 1" name="entry.984193296" />
      </div>

      <div class="grid gap-2">
        <label>Catatan</label>
        <textarea class="border p-2" placeholder="ex: bunganya merah sama putih" name="entry.1524280066"></textarea>
      </div>

      <button class="bg-blue-500 text-white p-2 rounded" :disabled="!hasProductSelected" type="submit">Kirim</button>
    </div>
  </form>
</template>
