import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function Rating({
    rating,
}: {
    rating: number;
}) {
    return (
        <div className="flex flex-row">
            {new Array(4).map((_, id) => {
                return (
                    <span key={`rating-${id}`}>
                        {rating > id + 1 ? (
                            <StarIcon
                                strokeWidth="1"
                                className="h-4 w-4 fill-accent-400 stroke-surface-900 "
                            />
                        ) : rating > id + 0.5 ? (
                            <StarHalfIcon
                                strokeWidth="1"
                                className="h-4 w-4 fill-accent-400 stroke-surface-900 "
                            />
                        ) : (
                            <StarBorderIcon
                                strokeWidth="1"
                                className="h-4 w-4 fill-accent-400 stroke-surface-900 "
                            />
                        )}
                    </span>
                );
            })}
            <br />
        </div>
    );
}
