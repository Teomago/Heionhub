import { FieldLabelServerComponent } from 'payload'
import { IconRenderer } from './ui'

export const IconLabel: FieldLabelServerComponent = ({ siblingData }) => {
	if (!siblingData?.icon && !siblingData?.color) return null

	return (
		<>
			<IconRenderer name={siblingData?.icon} size={16} />
			{siblingData?.color && (
				<span
					className="inline-block size-4 rounded-xs border ml-2"
					style={{ backgroundColor: siblingData?.color }}
				/>
			)}
		</>
	)
}
