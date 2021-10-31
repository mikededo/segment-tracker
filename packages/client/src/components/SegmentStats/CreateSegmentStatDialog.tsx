import { useAppContext } from '@context/AppContext';
import { SegmentStatForm } from '@interfaces/forms';
import { Parsers } from '@interfaces/shared';
import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  Grid,
  Slider,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface CreateSegmentStatDialogProps {
  onClose: () => void;
}

const CreateSegmentStatDialog: React.FC<
  DialogProps & CreateSegmentStatDialogProps
> = ({ onClose, ...props }) => {
  const { api, segments } = useAppContext();
  const { handleSubmit, register, formState } = useForm<SegmentStatForm>({});

  const [feelValue, setFeelValue] = useState(5);

  const handleOnSubmit = (data: SegmentStatForm) => {
    api.segments.postStat(
      segments.active?.segment?._id as string,
      Parsers.segmentStatFormToSegmentStat({ ...data, feel: feelValue })
    );
  };

  return (
    <Dialog onClose={onClose} maxWidth="sm" fullWidth {...props}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <DialogContent>
          <Stack spacing={2}>
            <Typography variant="h3">Add a segment stat</Typography>

            <DialogContentText variant="body2">
              Add a new stat and compare it with the already added!
            </DialogContentText>
          </Stack>

          <Grid marginTop={2} rowSpacing={1} columnSpacing={1} container>
            <Grid item xs={4}>
              <TextField
                label="Duration"
                error={Boolean(formState.errors.duration)}
                helperText={formState.errors.duration?.message}
                placeholder="30m 15s..."
                fullWidth
                {...register('duration', {
                  required: {
                    value: true,
                    message: 'This field is required'
                  },
                  min: { value: 0.0, message: 'Minimum value is 0.0' },
                  pattern: {
                    value: /^(?:(\d+)h\s*)?(?:(\d+)m\s*)?(?:(\d+)s\s*)?$/g,
                    message: 'Enter a valid duration'
                  }
                })}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Speed (km/h)"
                error={Boolean(formState.errors.speed)}
                helperText={formState.errors.speed?.message}
                fullWidth
                {...register('speed', {
                  required: {
                    value: true,
                    message: 'This field is required'
                  },
                  min: { value: 0.0, message: 'Minimum value is 0.0' },
                  pattern: {
                    value: /^[0-9]+([,.][0-9]+)?$/g,
                    message: 'Enter a valid speed'
                  }
                })}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Cadence"
                error={Boolean(formState.errors.cadence)}
                helperText={formState.errors.cadence?.message}
                fullWidth
                {...register('cadence', {
                  required: {
                    value: true,
                    message: 'This field is required'
                  },
                  min: { value: 0, message: 'Minimum value is 0' },
                  pattern: {
                    value: /^[0-9]+/g,
                    message: 'Enter a valid cadence'
                  }
                })}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Average bpm"
                error={Boolean(formState.errors.bpm)}
                helperText={formState.errors.bpm?.message}
                fullWidth
                {...register('bpm', {
                  required: {
                    value: true,
                    message: 'This field is required'
                  },
                  min: { value: 0.0, message: 'Minimum value is 0.0' },
                  pattern: {
                    value: /^[0-9]+([,.][0-9]+)?$/g,
                    message: 'Enter a valid speed'
                  }
                })}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Power (W)"
                error={Boolean(formState.errors.power)}
                helperText={formState.errors.power?.message}
                fullWidth
                {...register('power', {
                  required: {
                    value: true,
                    message: 'This field is required'
                  },
                  min: { value: 0, message: 'Minimum value is 0' },
                  pattern: {
                    value: /^[0-9]+([,.][0-9])?$/g,
                    message: 'Enter a valid power'
                  }
                })}
              />
            </Grid>

            <Grid marginTop={1} item xs={12}>
              <Typography paddingBottom={1}>Feel</Typography>

              <Slider
                min={0}
                max={10}
                valueLabelDisplay="auto"
                onChangeCommitted={(_, value) => setFeelValue(value as number)}
                marks
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Stat notes"
                helperText="This field is optional"
                rows={3}
                multiline
                fullWidth
                {...register('notes')}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <LoadingButton loading={false} variant="text" onClick={onClose}>
            Cancel
          </LoadingButton>

          <LoadingButton loading={false} type="submit">
            Create
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateSegmentStatDialog;
