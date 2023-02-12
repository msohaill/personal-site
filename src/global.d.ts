/// <reference types="@sveltejs/kit" />
declare module '$static/data/images.yaml' {
  const t: {
    [key: string]: {
      caption: string;
      location: string;
      date: Date;
    }
  }
  export default t;
};
