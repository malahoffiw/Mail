const initOptions = {
    statusbar: false,
    menubar: false,
    plugins: [
        "advlist",
        "autolink",
        "lists",
        "link",
        "charmap",
        "preview",
        "searchreplace",
        "visualblocks",
        "media",
        "table",
        "quickbars",
        "image",
        "fullscreen",
    ],
    quickbars_selection_toolbar:
        "bold italic underline | quicklink blockquote | removeformat",
    quickbars_insert_toolbar: "quickimage quicktable media | bullist numlist",
    quickbars_image_toolbar: "alignleft aligncenter alignright ",
    toolbar:
        "fullscreen export undo redo | " +
        "bold italic underline | backcolor forecolor |" +
        " fontsize fontfamily | list | insert",
    toolbar_groups: {
        list: {
            icon: "unordered-list",
            tooltip: "List",
            items: "bullist numlist",
        },
        insert: {
            icon: "plus",
            tooltip: "Insert",
            items: "table image media",
        },
    },
    browser_spellcheck: true,
    skin_url: "/editor/skins/ui/CUSTOM",
    content_css: "/editor/skins/content/CUSTOM/content.css",
}

export default initOptions
