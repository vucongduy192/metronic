import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: () => import("@/views/theme/Base"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/views/pages/Dashboard.vue")
        },
        {
          path: "/builder",
          name: "builder",
          component: () => import("@/views/pages/Builder.vue")
        },
        {
          path: "/vuetify",
          name: "vuetify",
          component: () => import("@/views/pages/vuetify/Vuetify.vue"),
          children: [
            {
              path: "alerts",
              name: "vuetify-alerts",
              component: () => import("@/views/pages/vuetify/Alerts.vue")
            },
            {
              path: "avatars",
              name: "vuetify-avatars",
              component: () => import("@/views/pages/vuetify/Avatars.vue")
            },
            {
              path: "badges",
              name: "vuetify-badges",
              component: () => import("@/views/pages/vuetify/Badges.vue")
            },
            {
              path: "buttons",
              name: "vuetify-buttons",
              component: () => import("@/views/pages/vuetify/Buttons.vue")
            },
            {
              path: "calendars",
              name: "vuetify-calendars",
              component: () => import("@/views/pages/vuetify/Calendars.vue")
            },
            {
              path: "cards",
              name: "vuetify-cards",
              component: () => import("@/views/pages/vuetify/Cards.vue")
            },
            {
              path: "chips",
              name: "vuetify-chips",
              component: () => import("@/views/pages/vuetify/Chips.vue")
            },
            {
              path: "dialog",
              name: "vuetify-dialog",
              component: () => import("@/views/pages/vuetify/Dialog.vue")
            },
            {
              path: "autocompletes",
              name: "vuetify-autocompletes",
              component: () =>
                import("@/views/pages/vuetify/forms/Autocompletes.vue")
            },
            {
              path: "file-inputs",
              name: "vuetify-file-inputs",
              component: () =>
                import("@/views/pages/vuetify/forms/FileInputs.vue")
            },
            {
              path: "forms",
              name: "vuetify-forms",
              component: () => import("@/views/pages/vuetify/forms/Forms.vue")
            },
            {
              path: "selection-controls",
              name: "vuetify-selection-controls",
              component: () =>
                import("@/views/pages/vuetify/forms/SelectionControls.vue")
            },
            {
              path: "selects",
              name: "vuetify-selects",
              component: () => import("@/views/pages/vuetify/forms/Selects.vue")
            },
            {
              path: "textareas",
              name: "vuetify-textareas",
              component: () =>
                import("@/views/pages/vuetify/forms/Textareas.vue")
            },
            {
              path: "text-fields",
              name: "vuetify-text-fields",
              component: () =>
                import("@/views/pages/vuetify/forms/TextFields.vue")
            },
            {
              path: "simple-tables",
              name: "vuetify-simple-tables",
              component: () =>
                import("@/views/pages/vuetify/tables/SimpleTables.vue")
            },
            {
              path: "data-tables",
              name: "vuetify-data-tables",
              component: () =>
                import("@/views/pages/vuetify/tables/DataTables.vue")
            },
            {
              path: "tabs",
              name: "vuetify-tabs",
              component: () => import("@/views/pages/vuetify/Tabs.vue")
            },
            {
              path: "timelines",
              name: "vuetify-timelines",
              component: () => import("@/views/pages/vuetify/Timelines.vue")
            },
            {
              path: "tooltips",
              name: "vuetify-tooltips",
              component: () => import("@/views/pages/vuetify/Tooltips.vue")
            },
            {
              path: "treeview",
              name: "vuetify-treeview",
              component: () => import("@/views/pages/vuetify/Treeview.vue")
            }
          ]
        },
        {
          path: "/wizard",
          name: "wizard",
          component: () => import("@/views/pages/wizard/Wizard.vue"),
          children: [
            {
              path: "wizard-1",
              name: "wizard-1",
              component: () => import("@/views/pages/wizard/Wizard-1.vue")
            },
            {
              path: "wizard-2",
              name: "wizard-2",
              component: () => import("@/views/pages/wizard/Wizard-2.vue")
            },
            {
              path: "wizard-3",
              name: "wizard-3",
              component: () => import("@/views/pages/wizard/Wizard-3.vue")
            },
            {
              path: "wizard-4",
              name: "wizard-4",
              component: () => import("@/views/pages/wizard/Wizard-4.vue")
            }
          ]
        },
        {
          path: "/custom",
          name: "custom",
          component: () => import("@/views/pages/custom/Custom.vue"),
          children: [
            {
              path: "user",
              name: "user",
              component: () => import("@/views/pages/custom/User.vue")
            }
          ]
        }
      ]
    },
    {
      path: "/error",
      name: "error",
      component: () => import("@/views/pages/error/Error.vue"),
      children: [
        {
          path: "error-1",
          name: "error-1",
          component: () => import("@/views/pages/error/Error-1.vue")
        },
        {
          path: "error-2",
          name: "error-2",
          component: () => import("@/views/pages/error/Error-2.vue")
        },
        {
          path: "error-3",
          name: "error-3",
          component: () => import("@/views/pages/error/Error-3.vue")
        },
        {
          path: "error-4",
          name: "error-4",
          component: () => import("@/views/pages/error/Error-4.vue")
        },
        {
          path: "error-5",
          name: "error-5",
          component: () => import("@/views/pages/error/Error-5.vue")
        },
        {
          path: "error-6",
          name: "error-6",
          component: () => import("@/views/pages/error/Error-6.vue")
        }
      ]
    },
    {
      path: "/",
      component: () => import("@/views/pages/auth/Auth"),
      children: [
        {
          name: "login",
          path: "/login",
          component: () => import("@/views/pages/auth/Login")
        },
        {
          name: "register",
          path: "/register",
          component: () => import("@/views/pages/auth/Register")
        }
      ]
    },
    {
      path: "*",
      redirect: "/404"
    },
    {
      // the 404 route, when none of the above matches
      path: "/404",
      name: "404",
      component: () => import("@/views/pages/error/Error-1.vue")
    }
  ]
});
