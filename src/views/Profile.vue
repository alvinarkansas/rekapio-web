<template>
  <BaseModal v-model="modal.category">
    <ModalCategory @close="closeCategoryModal" />
  </BaseModal>

  <BaseModal v-model="modal.categoryEdit">
    <ModalCategoryEdit @close="closeCategoryEdit" />
  </BaseModal>

  <BaseModal v-model="modal.icon">
    <ModalIcon @close="closeIconModal" @setIcon="setIcon" />
  </BaseModal>

  <section class="px-4">
    <h2 class="mb-4 font-bold text-lg">Hello!</h2>

    <div class="grid gap-4 mb-16">
      <button class="flex justify-between p-4 rounded-xl bg-dark-100">
        <span class="text-sm font-semibold">Your Account</span>
        <ChevronRightIcon class="h-5 w-5" />
      </button>

      <button
        @click="openCategoryModal"
        class="flex justify-between p-4 rounded-xl bg-dark-100"
      >
        <span class="text-sm font-semibold">Your Categories</span>
        <ChevronRightIcon class="h-5 w-5" />
      </button>
    </div>

    <div class="w-full">
      <BaseButton
        loading-label="Wait a sec"
        flavor="danger"
        label="Logout"
        class="w-full py-3"
        size="md"
        @click="logout"
        :loading="loading"
      />
    </div>
  </section>
</template>

<script>
import { API } from "../api";
import mixin from "../mixin";
import BaseButton from "../components/BaseButton.vue";
import BaseModal from "../components/BaseModal.vue";
import ModalCategory from "../components/ModalCategory.vue";
import ModalCategoryEdit from "../components/ModalCategoryEdit.vue";
import ModalIcon from "../components/ModalIcon.vue";
import { ChevronRightIcon } from "@heroicons/vue/solid";

export default {
  name: "Profile",
  components: {
    BaseButton,
    BaseModal,
    ModalCategory,
    ModalCategoryEdit,
    ModalIcon,
    ChevronRightIcon,
  },
  mixins: [mixin],
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    modal() {
      return this.$store.state.modal;
    },
    categoryEditForm() {
      return this.$store.state.categoryEditForm;
    },
  },
  methods: {
    async logout() {
      try {
        this.loading = true;
        await API.post("/users/revoke_refresh_token");
        this.$store.commit("SET_TOKEN", "");
        this.$store.commit("SET_AUTHENTICATED", false);
        this.$router.push("/");
      } catch (error) {
        this.revealError(error);
      }
      this.loading = false;
    },
    openCategoryModal() {
      this.$store.commit("SET_MODAL", { type: "category", payload: true });
    },
    closeCategoryModal() {
      this.$store.commit("SET_MODAL", { type: "category", payload: false });
    },
    closeCategoryEdit() {
      this.$store.commit("SET_MODAL", { type: "categoryEdit", payload: false });
    },
    closeIconModal() {
      this.$store.commit("SET_MODAL", { type: "icon", payload: false });
    },
    setIcon(icon) {
      this.$store.commit("SET_CATEGORY_EDIT_FORM", { ...this.categoryEditForm, icon });
      this.closeIconModal();
    },
  },
};
</script>
