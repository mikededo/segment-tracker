import React from 'react';

import { useForm } from 'react-hook-form';

import { useAppContext } from '@context/AppContext';
import { SegmentType } from '@interfaces/enums';
import { SegmentForm } from '@interfaces/forms';
import { Parsers } from '@interfaces/shared';
import {
  Timeline,
  TrendingDown,
  TrendingFlat,
  TrendingUp
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  capitalize,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';

interface CreateSegmentDialogProps {
  onClose: () => void;
}

const CreateSegmentDialog: React.FC<DialogProps & CreateSegmentDialogProps> = ({
  onClose,
  ...props
}) => {
  const { handleSubmit, register, formState } = useForm<SegmentForm>({
    defaultValues: { type: SegmentType.FLAT }
  });

  const { api } = useAppContext();

  const handleOnSubmit = (data: SegmentForm) => {
    api.segments.post(Parsers.segmentFormToSegment(data), onClose);
  };

  const selectOption = (value: SegmentType, icon: React.ReactNode) => (
    <MenuItem value={value}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{capitalize(value.toLowerCase())}</ListItemText>
    </MenuItem>
  );

  return (
    <Dialog onClose={onClose} maxWidth="sm" fullWidth {...props}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <DialogContent>
          <Stack spacing={2}>
            <Typography variant="h3">Create a Segment</Typography>

            <DialogContentText variant="body2">
              Create a segment to start improving at it!
            </DialogContentText>

            <TextField
              label="Segment name"
              type="text"
              error={Boolean(formState.errors.name)}
              helperText={formState.errors.name?.message}
              fullWidth
              {...register('name', {
                required: { value: true, message: 'This field is required' }
              })}
            />

            <Stack direction="row" spacing={2}>
              <TextField
                label="Distance"
                error={Boolean(formState.errors.distance)}
                helperText={formState.errors.distance?.message}
                fullWidth
                {...register('distance', {
                  required: { value: true, message: 'This field is required' },
                  min: { value: 0.0, message: 'Minimum value is 0.0' },
                  pattern: {
                    value: /^[0-9]+([,.][0-9]+)?$/g,
                    message: 'Enter a valid distance'
                  }
                })}
              />
              <TextField
                label="Elevation"
                error={Boolean(formState.errors.elevation)}
                helperText={formState.errors.elevation?.message}
                fullWidth
                {...register('elevation', {
                  required: { value: true, message: 'This field is required' },
                  min: { value: 0, message: 'Minimum value is 0' },
                  pattern: {
                    value: /^[0-9]+$/g,
                    message: 'Enter a valid elevation'
                  }
                })}
              />

              <FormControl fullWidth>
                <InputLabel id="segment-type">Type</InputLabel>
                <Select
                  labelId="segment-type"
                  label="Type"
                  defaultValue={SegmentType.AUTO}
                  renderValue={(value: SegmentType) =>
                    capitalize(value.toLowerCase())
                  }
                  {...register('type', { required: true })}
                >
                  {selectOption(SegmentType.AUTO, <Timeline />)}

                  {selectOption(SegmentType.DOWNHILL, <TrendingDown />)}

                  {selectOption(SegmentType.FLAT, <TrendingFlat />)}

                  {selectOption(SegmentType.HILLY, <TrendingUp />)}
                </Select>
              </FormControl>
            </Stack>

            <Stack spacing={0.5}>
              <TextField
                label="Strava URL"
                type="text"
                fullWidth
                {...register('stravaUrl')}
              />
              <DialogContentText variant="caption">
                This field is optional!
              </DialogContentText>
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions>
          <LoadingButton loading={api.loading} variant="text" onClick={onClose}>
            Cancel
          </LoadingButton>
          <LoadingButton loading={api.loading} type="submit">
            Create
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateSegmentDialog;
