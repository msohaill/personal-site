<script lang="ts">
  import { Select } from 'bits-ui';
  import { ChevronsUpDown, ChevronUp, ChevronDown, Check, type Icon } from 'lucide-svelte';

  type BaseProps = {
    items: { label: string, value: string }[];
    type: 'multiple' | 'single';
    placeholder: string;
    SelectIcon?: typeof Icon;
  };

  type MultipleSelectProps = BaseProps & {
    type: 'multiple';
    selected?: string[];
  };

  type SingleSelectProps = BaseProps & {
    type: 'single';
    selected?: string;
  };

  type Props = MultipleSelectProps | SingleSelectProps;

  let {
    selected = $bindable(),
    items,
    type,
    placeholder,
    SelectIcon = ChevronsUpDown,
  }: Props = $props();

  const getTriggerLabel = (value?: string[] | string) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return placeholder;
    if (Array.isArray(value)) return value.map(v => items.find(i => i.value === v)?.label ?? v).join(', ');
    return items.find(i => i.value === value)?.label ?? value;
  };
</script>

<Select.Root {type} {items} bind:value={selected as never} allowDeselect={true}>
  <Select.Trigger class="filter">
    <span class="truncate">{getTriggerLabel(selected)}</span>
    <SelectIcon size="15" class="ml-2 shrink-0" />
  </Select.Trigger>
  <Select.Portal>
    <Select.Content class="select-content" sideOffset={5}>
      <Select.ScrollUpButton class="select-scroll-button">
        <ChevronUp size="15" />
      </Select.ScrollUpButton>
      <Select.Viewport>
        {#each items as item}
          <Select.Item class="select-item" value={item.value} label={item.label}>
            {#snippet children({ selected })}
              <span class="">{item.label}</span>
              <span class="w-10 flex justify-end">
                {#if selected}
                  <Check size="15" />
                {/if}
              </span>
            {/snippet}
          </Select.Item>
        {/each}
      </Select.Viewport>
      <Select.ScrollDownButton class="select-scroll-button">
        <ChevronDown size="15" />
      </Select.ScrollDownButton>
    </Select.Content>
  </Select.Portal>
</Select.Root>

<style lang="postcss">
  @reference "tailwindcss";
  @reference "../../app.css";

  :global(.select-content) {
    @apply bg-white border-2 border-pastel-blue shadow-xl max-h-64;
  }

  :global(.select-item) {
    @apply p-1 cursor-pointer flex items-center justify-between text-sm
    data-highlighted:bg-pastel-blue-light/20 outline-hidden select-none;
  }

  :global(.select-scroll-button) {
    @apply flex w-full items-center justify-center;
  }
</style>
