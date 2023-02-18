<script lang="ts">
  import Metadata from '$lib/components/Metadata.svelte';
  import Occupation from '$lib/components/Occupation.svelte';
  import mcgill from '$static/images/mcgill.svg';
</script>

<Metadata
  title="Muhammad Sohail – Resume"
  description="Software engineer, student, and photographer. Building applications that bring meaning to us."
/>

<div class="layout">
  <p>
    Here is a <a href="/assets/Muhammad_Sohail_Resume.pdf" class="link"
      ><em class="keyword">hard copy</em></a
    > for those interested.
  </p>
</div>

<section class="layout py-12">
  <h2 class="section-heading">Education</h2>

  <div class="mb-4">
    <div class="flex justify-between items-end">
      <h3 class="text-black text-lg flex gap-2">
        McGill University
        <a href="https://www.mcgill.ca"><img class="coat" src={mcgill} alt="mcgill logo" /></a>
      </h3>
      <div class="text-neutral-500 mb-0.5">2020 — Present</div>
    </div>
    <p class="byline">Honours B.Sc. in Computer Science</p>
  </div>

  <h4 class="font-medium mt-4 mb-1">Technical coursework:</h4>
  <ul>
    <li>
      Computer Systems (<a
        href="https://www.mcgill.ca/study/2021-2022/courses/comp-273"
        class="link">COMP 273</a
      >)
    </li>
    <li>
      Honours Algorithms and Data Structures (<a
        href="https://www.mcgill.ca/study/2021-2022/courses/comp-252"
        class="link">COMP 252</a
      >)
    </li>
    <li>
      Linear Algebra (<a href="https://www.mcgill.ca/study/2021-2022/courses/math-223" class="link"
        >MATH 223</a
      >)
    </li>
    <li>
      Operating Systems (<a
        href="https://www.mcgill.ca/study/2023-2023/courses/comp-310"
        class="link">COMP 310</a
      >)
    </li>
    <li>
      Probability (<a href="https://www.mcgill.ca/study/2023-2023/courses/math-323" class="link"
        >MATH 322</a
      >)
    </li>
    <li>
      Programming Languages and Paradigms (<a
        href="https://www.mcgill.ca/study/2022-2023/courses/comp-302"
        class="link">COMP 302</a
      >)
    </li>
    <li>
      Software Design (<a href="https://www.mcgill.ca/study/2022-2023/courses/comp-303" class="link"
        >COMP 303</a
      >)
    </li>
    <li>
      Theory of Computation (<a
        href="https://www.mcgill.ca/study/2023-2023/courses/comp-330"
        class="link">COMP 330</a
      >)
    </li>
  </ul>
</section>

<section class="layout py-12">
  <h2 class="section-heading">Professional Experience</h2>

  <Occupation
    title="Data Engineering Intern"
    company="Coveo"
    url="https://www.coveo.com/"
    dates="January 2023 – Present"
    location="Montréal, QC"
  >
    <li>
      Developing data transformation pipelines to provide normalized and insightful models to
      internal and external stakeholders
    </li>
  </Occupation>

  <Occupation
    title="Software Engineering Intern"
    company="Pattern Labs"
    url="https://patternjobs.com/"
    dates="May 2022 – August 2022"
    location="Toronto, ON"
  >
    <li>
      Worked on backend services, cloud development, and data for a fast-growing startup using
      TypeScript Node, AWS, Terraform, and dbt.
    </li>
    <li>
      Worked a lot on observability, setting up service monitoring, metric dashboards, and trace
      propagation using Datadog.
    </li>
    <li>
      Made key contributions to our new data platform, setting up ETL pipelines with dbt, Snowflake,
      and Fivetran.
    </li>
  </Occupation>
</section>

<style lang="postcss">
  .coat {
    @apply w-6 h-6;
  }

  ul {
    @apply list-disc pl-7 marker:text-neutral-400;
  }

  .byline {
    @apply font-serif italic text-[105%];
  }
</style>
