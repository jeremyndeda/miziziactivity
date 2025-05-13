import * as React from 'react';
import { Calendar } from '@/components/ui/calendar'; // or wherever your Calendar comes from
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface DatePickerWrapperProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function DatePickerWrapper({ value, onChange }: DatePickerWrapperProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn('w-full justify-start text-left font-normal', !value && 'text-muted-foreground')}>
          {value ? format(value, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={value} onSelect={(date) => date && onChange(date)} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
