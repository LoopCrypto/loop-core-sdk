import tseslint from "typescript-eslint";

const allowAnyTypeInCatch = {
    preprocess(text, filename) {
        const removedAnyFromCatch = text.replace(
            /(\.catch\s*|catch\s*)\s*\((\s*function\s*)?(\s*\(?\{?[\w\s,]*\}?\)?)\s*:\s*any\s*\)/g,
            (match, keyword, fnKeyword, params) =>
                `${keyword}(${fnKeyword ?? ""}${params})`,
        );
        return [{ text: removedAnyFromCatch, filename }];
    },
    supportsAutofix: true,
};

const custom = {
    rules: {},
    processors: {
        "allow-any-type-in-catch": allowAnyTypeInCatch,
    },
};

export default tseslint.config(tseslint.configs.recommended, {
    plugins: {
        custom,
    },
    processor: "custom/allow-any-type-in-catch",
    rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": "error",
        "no-extra-semi": "off",
        //"@typescript-eslint/no-unsafe-member-access": ["warn"],
        //"@typescript-eslint/no-unsafe-argument": ["warn"],
        //"@typescript-eslint/no-unsafe-assignment": ["warn"],
        //"@typescript-eslint/no-unsafe-call": ["warn"],
        //"@typescript-eslint/no-unsafe-return": ["warn"],
        //"@typescript-eslint/restrict-template-expressions": "warn",
        "no-restricted-imports": [
            "error",
            {
                name: "console",
                message:
                    "\n\nThis is not the console package you're looking for (waves hand).\n\"This is not the console package I'm looking for.\"",
            },
        ],
    },
    ignores: ["node_modules", ".serverless", ".webpack", "dist"],
});
