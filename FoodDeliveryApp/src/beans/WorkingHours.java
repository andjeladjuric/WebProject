package beans;

import java.time.LocalTime;

public class WorkingHours {
	private int dayOfWeek; // 1 - Monday, 7 - Sunday
	private LocalTime startTime;
	private LocalTime endTime;
	private boolean closed;
	
	public WorkingHours() {}
	
	public WorkingHours(int dayOfWeek, LocalTime startTime, LocalTime endTime, boolean closed) {
		super();
		this.dayOfWeek = dayOfWeek;
		this.startTime = startTime;
		this.endTime = endTime;
		this.closed = closed;
	}

	public int getDayOfWeek() {
		return dayOfWeek;
	}

	public void setDayOfWeek(int dayOfWeek) {
		this.dayOfWeek = dayOfWeek;
	}

	public LocalTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalTime startTime) {
		this.startTime = startTime;
	}

	public LocalTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalTime endTime) {
		this.endTime = endTime;
	}

	public boolean isClosed() {
		return closed;
	}

	public void setClosed(boolean closed) {
		this.closed = closed;
	}

	
	
}
